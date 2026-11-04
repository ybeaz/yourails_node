import fs from 'node:fs/promises'
import os from 'node:os'
import { join } from 'node:path'
import { Browser, BrowserContext, chromium, Page } from 'playwright'
import {
  BrowserActionType,
  FuncModeEnumType,
  HandlersPlaywriteKeysEnum,
  timeout,
  withTryCatchFinallyWrapper,
} from 'yourails_common'
import { consoler } from '../consoler'
import { consolerError } from '../consolerError'
import { getPausedScript } from '../getPausedScript'
import { getAttachedDebug } from './getAttachedDebug'
import type { SelectorCheckArgsType, SelectorCheckResType } from './getSelectorCheck'
import { getSelectorCheck } from './getSelectorCheck'
import { getShortUrl } from './getShortUrl'
import { HandlersPlaywriteDict } from './HandlersPlaywrightDict'

const DEBUG_DIR = join(__dirname, '__output__')

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           export const getExecutedBrowserActionsCases: GetExecutedBrowserActionsCaseType[] = [
             {
               index: 0,
               description: 'basic test getValidatedEntityLinksFilesReadable',
               params: {},
               options: {},
               expected: '',
             },
           ]
 */

type GetExecutedBrowserActionsParamsType = {
  actions: BrowserActionType[]
  isPauseResume?: boolean
  isShowingInfo?: boolean
  indexStartInfo?: number
  isClosingBrowserManually?: boolean
  isProduction?: boolean /* if true then headless */
  userDataDir?: string
  isIgnoringHttpsErrors?: boolean
  cdpEndpoint?: string /* e.g. 'http://localhost:9222'; attaches to a running Chrome */
  isClosingAtFinish?: boolean
  finalUrlPattern?: string // e.g. '**/yourails.com/auth-tiktok**'
  timeoutFinalUrlMs?: number // e.g. 60000
}

type GetExecutedBrowserActionsOptionsType = { funcParent?: string }

type GetExecutedBrowserActionResType = unknown

type GetExecutedBrowserActionsType = (
  params: GetExecutedBrowserActionsParamsType,
  options?: GetExecutedBrowserActionsOptionsType,
) => Promise<GetExecutedBrowserActionResType[]>

const optionsDefault = {
  funcParent: 'getExecutedBrowserActions',
} satisfies Required<GetExecutedBrowserActionsOptionsType>

const resDefault: GetExecutedBrowserActionResType[] = []

const USER_DATA_DIR_DEFAULT = join(os.homedir(), '.yourails-browser-profile')

/* Remove stale Chromium lock files left after a SIGKILL */
const getRemovedStaleLocks = async (userDataDir: string) => {
  for (const name of ['SingletonLock', 'SingletonCookie', 'SingletonSocket']) {
    await fs.rm(join(userDataDir, name), { force: true }).catch(() => {})
  }
}

/* A page is "alive" if it is open and its JS context answers within a short time */
const getIsPageResponsive = async (p: Page, timeoutMs = 2000): Promise<boolean> => {
  if (p.isClosed()) return false
  try {
    await Promise.race([
      p.evaluate(() => true),
      new Promise((_, reject) => setTimeout(() => reject(new Error('unresponsive')), timeoutMs)),
    ])
    return true
  } catch {
    return false
  }
}

class ActionTimeoutError extends Error {
  name = 'TimeoutError'
}

const getWithTimeout = async <T>(promise: Promise<T>, ms?: number): Promise<T> => {
  if (!ms) return promise
  let id: ReturnType<typeof setTimeout>
  const timer = new Promise<never>((_, reject) => {
    id = setTimeout(() => reject(new ActionTimeoutError('Timeout exceeded')), ms)
  })
  try {
    return await Promise.race([promise, timer])
  } finally {
    clearTimeout(id!)
  }
}

const getNormalizedToolName = (toolName: HandlersPlaywriteKeysEnum): HandlersPlaywriteKeysEnum =>
  toolName.replace(/^(playwright|browser)_/, '') as HandlersPlaywriteKeysEnum

/**
 * @description Executes browser actions sequentially.
 *   - With `cdpEndpoint`: attaches to an already running, logged-in Chrome and works in a NEW tab,
 *     leaving your other tabs and the browser itself untouched.
 *   - Without it: launches a persistent Chromium/Chrome profile in `userDataDir`
 *     (log in manually once, cookies are reused on later runs).
 * @usage
   import { getExecutedBrowserActions, GetExecutedBrowserActionsParamsType } from './getExecutedBrowserActions'
   const getExecutedBrowserActionsParams: GetExecutedBrowserActionsParamsType = {
     actions: [{ toolName: 'browser_navigate', toolArgs: { url: 'https://example.com' } }],
     cdpEndpoint: 'http://localhost:9222',
     isShowingInfo: true,
   }
   const res = await getExecutedBrowserActions(getExecutedBrowserActionsParams)
 */
const getExecutedBrowserActionsUnsafe: GetExecutedBrowserActionsType = async (
  {
    actions,
    isPauseResume = false,
    isShowingInfo = false,
    indexStartInfo = 0,
    isClosingBrowserManually = false,
    isProduction = false,
    userDataDir = USER_DATA_DIR_DEFAULT,
    isIgnoringHttpsErrors = true,
    cdpEndpoint,
    isClosingAtFinish = true,
    finalUrlPattern, // e.g. '**/yourails.com/auth-tiktok**'
    timeoutFinalUrlMs = 60000,
  }: GetExecutedBrowserActionsParamsType,
  options: GetExecutedBrowserActionsOptionsType = optionsDefault,
): Promise<GetExecutedBrowserActionResType[]> => {
  const output: GetExecutedBrowserActionResType[] = []
  const isCdp = Boolean(cdpEndpoint)

  let browser: Browser | null = null
  let context: BrowserContext

  if (isShowingInfo) await fs.mkdir(DEBUG_DIR, { recursive: true })

  if (isCdp) {
    /* Attach to the running Chrome; never launch, never touch its profile/locks */
    browser = await chromium.connectOverCDP(cdpEndpoint!)
    context = browser.contexts()[0] ?? (await browser.newContext())
  } else {
    await fs.mkdir(userDataDir, { recursive: true })
    await getRemovedStaleLocks(userDataDir)

    context = await chromium.launchPersistentContext(userDataDir, {
      channel: 'chrome' /* real Chrome; remove this line to use bundled Chromium */,
      headless: isProduction,
      ignoreHTTPSErrors: isIgnoringHttpsErrors,
      viewport: null,
      ignoreDefaultArgs: ['--enable-automation'],
      args: ['--disable-blink-features=AutomationControlled'],
    })
  }

  /* Tabs opened by this run, so that in CDP mode only these get closed */
  const openedPages = new Set<Page>()
  const pagesBefore = new Set<Page>(context.pages())
  let urlLast: string | undefined /* last main-frame URL seen in any tab */

  const getTrackedPage = (p: Page): Page => {
    p.on('framenavigated', (frame) => {
      if (frame === p.mainFrame()) urlLast = frame.url()
    })
    return p
  }

  const getIsPageResponsive = async (p: Page, timeoutMs = 2000): Promise<boolean> => {
    if (p.isClosed()) return false
    try {
      await Promise.race([
        p.evaluate(() => true),
        new Promise((_, reject) => setTimeout(() => reject(new Error('unresponsive')), timeoutMs)),
      ])
      return true
    } catch {
      return false
    }
  }

  const getNewPage = async (): Promise<Page> => {
    const newPage = getTrackedPage(getAttachedDebug(await context.newPage(), isShowingInfo))
    openedPages.add(newPage)
    return newPage
  }

  context.on('page', (newPage) => {
    if (!pagesBefore.has(newPage)) {
      openedPages.add(newPage)
      getTrackedPage(newPage)
    }
  })

  const getFreshPage = async (): Promise<Page> => {
    if (isCdp) return getNewPage()
    const firstPage = context.pages()[0]
    return firstPage ? getTrackedPage(getAttachedDebug(firstPage, isShowingInfo)) : getNewPage()
  }

  let page = await getFreshPage()

  if (isShowingInfo && options) {
    /* Optional: full trace, view with `npx playwright show-trace debug/trace.zip` */
    await context.tracing.start({ screenshots: true, snapshots: true }).catch(() => {})
  }

  try {
    for (let indexAction = 0; indexAction < actions.length; indexAction++) {
      const action = actions[indexAction]
      const { toolName, toolArgs, info, timeoutBefore, timeoutAfter, timeoutTeminate } = action

      try {
        if (timeoutBefore) await timeout(timeoutBefore)

        if (isShowingInfo)
          consoler(
            `getExecutedBrowserActions [action ${indexAction + 1}/${actions.length}] start: ${toolName}`,
          )

        const handler = HandlersPlaywriteDict[getNormalizedToolName(toolName)]
        if (!handler) throw new Error(`Unknown tool: ${toolName}`)

        /* Page may have been closed by a popup/redirect; recover */
        if (page.isClosed()) page = await getFreshPage()

        const result = (await getWithTimeout(
          handler(page, toolArgs ?? {}, context),
          timeoutTeminate,
        )) as Partial<SelectorCheckResType>

        output.push(result)

        if (isShowingInfo) {
          consoler(`getExecutedBrowserActions [200]:`, {
            count: indexAction + 1,
            ofActions: actions.length,
            toolName,
            mode: isCdp ? 'cdp' : 'persistent',
            ...(info && { info }),
            result: result?.url ? { ...result, url: getShortUrl(result.url) } : result,
          })

          /* Selector check: explicit FOUND / NOT FOUND line + highlight in headed mode */
          if (result && typeof result.isFound === 'boolean') {
            console.log(
              `[selector ${result.isFound ? 'FOUND' : 'NOT FOUND'}] ` +
                `"${result.selector}" ` +
                `count=${result.count} visible=${result.isVisible} ` +
                `frames=${result.frameCount} url=${result.url ? getShortUrl(result.url) : ''}`,
            )

            if (result.selector && !isProduction) {
              await page
                .locator(result.selector)
                .first()
                .highlight()
                .catch(() => {})
            }
            if (!result.isFound) {
              await page
                .screenshot({
                  path: `${DEBUG_DIR}/action-${indexAction}-${toolName}-not-found.png`,
                  fullPage: true,
                })
                .catch(() => {})
            }
          }
        }

        if (isPauseResume) {
          const nextTool = actions[indexAction + 1]?.toolName ?? 'finish'
          await getPausedScript({
            message: `indexAction ${indexAction + indexStartInfo} of len ${actions.length + indexStartInfo}, tool completed: ${toolName}, next tool: ${nextTool}`,
          })
        }

        if (timeoutAfter) await timeout(timeoutAfter)
      } catch (error: any) {
        output.push(undefined) /* keep result indexes aligned with actions */

        if (isShowingInfo) {
          consolerError(`getExecutedBrowserActions ERROR`, {
            indexAction,
            toolName,
            name: error?.name,
            message: error?.message,
            url: page.isClosed() ? 'page closed' : getShortUrl(page.url()),
          })

          /* Screenshot BEFORE any page.close() below */
          if (!page.isClosed()) {
            await page
              .screenshot({
                path: `${DEBUG_DIR}/action-${indexAction}-${toolName}-error.png`,
                fullPage: true,
              })
              .catch(() => {})
          }
        }

        if (error?.name === 'TimeoutError') {
          console.warn(`Action ${indexAction} (${toolName}) timed out: ${error?.message}`)

          if (page.isClosed()) {
            /* Nothing to keep; the top of the loop opens a fresh page for the next action */
          } else if (await getIsPageResponsive(page)) {
            /* Keep the tab (and its URL/state). Only cancel a navigation that is still loading. */
            await page.evaluate(() => window.stop()).catch(() => {})
            if (isShowingInfo) console.log(`[timeout] keeping page: ${getShortUrl(page.url())}`)
          } else {
            /* Crashed or frozen: the only case where replacing is justified */
            console.warn(`Page is unresponsive; replacing it`)
            await page.close({ runBeforeUnload: false }).catch(() => {})
            openedPages.delete(page)
            if (indexAction < actions.length - 1) page = await getNewPage()
          }
        }
      }
    }

    await timeout(2000) /* lets a quick redirect settle */

    /* Final URL: wait for the real redirect target instead of reading page.url() immediately */
    const getFinalUrl = async (): Promise<string | undefined> => {
      const getLivePages = (): Page[] =>
        [page, ...context.pages().filter((p) => !pagesBefore.has(p))].filter((p) => !p.isClosed())

      if (finalUrlPattern) {
        const livePages = getLivePages()
        if (livePages.length) {
          try {
            /* Wait in every candidate tab; the redirect may land in a popup or another tab */
            return await Promise.any(
              livePages.map(async (p) => {
                await p.waitForURL(finalUrlPattern, {
                  timeout: timeoutFinalUrlMs,
                  waitUntil: 'commit',
                })
                return p.url()
              }),
            )
          } catch {
            console.warn(
              `[final] pattern "${finalUrlPattern}" not reached in ${timeoutFinalUrlMs}ms`,
            )
          }
        }
      }

      /* No pattern, or it timed out: fall back to the last URL we saw */
      return urlLast ?? (page.isClosed() ? undefined : page.url())
    }

    const urlFinal = await getFinalUrl()
    output.push({ url: urlFinal } as GetExecutedBrowserActionResType)

    if (isShowingInfo) {
      consoler(`getExecutedBrowserActions [final]:`, {
        url: urlFinal ? getShortUrl(urlFinal) : undefined,
      })
    }

    if (isClosingBrowserManually) {
      await getPausedScript({ message: `Enter to close the browser\n` })
    }
  } finally {
    const getClosedPage = async (p: Page) => {
      if (p.isClosed()) return
      try {
        await Promise.race([
          p.close({ runBeforeUnload: false }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('close timeout 5s')), 5000)),
        ])
      } catch (error: any) {
        console.warn('[finish] failed to close tab:', error?.message)
        /* Fallback: close the target directly through a CDP session */
        try {
          const targetSession = await context.newCDPSession(p)
          await targetSession.send('Page.close')
        } catch (cdpError: any) {
          console.warn('[finish] CDP close failed too:', cdpError?.message)
        }
      }
    }

    /* Persistent mode: save the trace BEFORE the context is closed */
    if (isShowingInfo && !isCdp) {
      await Promise.race([
        context.tracing.stop({ path: `${DEBUG_DIR}/trace.zip` }),
        new Promise((resolve) => setTimeout(resolve, 5000)),
      ]).catch(() => {})
    }

    if (isCdp) {
      if (isClosingAtFinish) {
        const toClose = new Set<Page>([
          ...openedPages,
          page,
          ...context.pages().filter((p) => !pagesBefore.has(p)),
        ])
        for (const p of toClose) await getClosedPage(p)
      }
      await browser?.close().catch(() => {}) /* only disconnects; Chrome keeps running */
    } else if (isClosingAtFinish) {
      await context
        .close()
        .catch((error) => console.warn('[finish] context close failed:', error?.message))
    }
  }

  return output
}

type GetExecutedBrowserActionsCaseType = {
  index: number
  description?: string
  params: Parameters<typeof getExecutedBrowserActions>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getExecutedBrowserActions>[1]
  expected: ReturnType<typeof getExecutedBrowserActions>
}

const getExecutedBrowserActions = withTryCatchFinallyWrapper<
  GetExecutedBrowserActionsParamsType,
  GetExecutedBrowserActionsOptionsType,
  GetExecutedBrowserActionResType
>(getExecutedBrowserActionsUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export type {
  GetExecutedBrowserActionResType,
  GetExecutedBrowserActionsCaseType,
  GetExecutedBrowserActionsOptionsType,
  GetExecutedBrowserActionsParamsType,
  GetExecutedBrowserActionsType,
}
export { getExecutedBrowserActions, HandlersPlaywriteDict }
