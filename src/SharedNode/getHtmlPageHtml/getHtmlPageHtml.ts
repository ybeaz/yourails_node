import { join } from 'node:path'
import { Browser, BrowserContext, chromium } from 'playwright'
import { FileTypeEnum, FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'
import { getWrittenFile2 } from '../getWrittenFile2/getWrittenFile2'

export enum WaitUntilEnum {
  commit = 'commit', // ⚡ Fastest	Response committed
  domcontentloaded = 'domcontentloaded', // ⚡ Fast	HTML parsed
  load = 'load', // 🟡 Medium	Page resources loaded
  networkidle = 'networkidle', // 🐢 Slow/unpredictable	Network becomes idle
}

type GetHtmlPageHtmlParamsType = {
  url: string
}

type GetHtmlPageHtmlOptionsType = {
  waitForTimeout?: number
  isLaunchPersistentContext?: boolean
  isHeadless?: boolean
  waitUntil?: WaitUntilEnum
  isWaitingForLoad?: boolean
  isFlattenShadowDom?: boolean
  gotoTimeout?: 30000
  funcParent?: string
}

type GetHtmlPageHtmlResType = { html: string }

type GetHtmlPageHtmlType = (
  params: GetHtmlPageHtmlParamsType,
  options?: GetHtmlPageHtmlOptionsType,
) => Promise<GetHtmlPageHtmlResType>

const optionsDefault = {
  waitForTimeout: 2000,
  isLaunchPersistentContext: false,
  isHeadless: true,
  funcParent: 'getHtmlPageHtml',
  waitUntil: WaitUntilEnum.load,
  isWaitingForLoad: false,
  isFlattenShadowDom: false,
  gotoTimeout: 30000,
} satisfies Required<GetHtmlPageHtmlOptionsType>

const resDefault: GetHtmlPageHtmlResType = { html: '' }

/**
 * @description Function to getHtmlPageHtml
 * @usage
 * @import {
 *   getHtmlPageHtml,
 *   GetHtmlPageHtmlParamsType,
 *   GetHtmlPageHtmlOptionsType,
 * } from './getHtmlPageHtml/getHtmlPageHtml'
 *
 * const getHtmlPageHtmlParams: GetHtmlPageHtmlParamsType = {}
 * const getHtmlPageHtmlOptions: GetHtmlPageHtmlOptionsType = {}
 *
 * getHtmlPageHtml(
 *   getHtmlPageHtmlParams,
 *   getHtmlPageHtmlOptions,
 * )
 */
const getHtmlPageHtmlUnsafe: GetHtmlPageHtmlType = async (
  { url }: GetHtmlPageHtmlParamsType,
  {
    waitForTimeout = 2000,
    isLaunchPersistentContext = false,
    isHeadless = true,
    waitUntil = WaitUntilEnum.load,
    isWaitingForLoad = false,
    isFlattenShadowDom = false,
    gotoTimeout = 30000,
  }: GetHtmlPageHtmlOptionsType = optionsDefault,
) => {
  let browser: Browser | undefined
  let context: BrowserContext | undefined

  try {
    if (isLaunchPersistentContext) {
      context = await chromium.launchPersistentContext('./playwright-profile', {
        headless: isHeadless,
      })
    } else {
      browser = await chromium.launch({
        headless: isHeadless,
      })

      context = await browser.newContext()
    }

    const page = await context.newPage()

    const response = await page.goto(url, {
      waitUntil,
      timeout: gotoTimeout,
    })

    if (isWaitingForLoad) {
      await page.waitForLoadState('networkidle').catch((err) => {
        console.warn(`networkidle wait failed for ${url}:`, err?.message)
      })
    }

    await page.waitForTimeout(waitForTimeout)

    const html = isFlattenShadowDom
      ? await page.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('*'))

          for (const element of elements) {
            const shadowRoot = element.shadowRoot

            if (!shadowRoot) {
              continue
            }

            const template = document.createElement('template')
            template.setAttribute('shadowrootmode', 'open')

            template.content.append(...Array.from(shadowRoot.childNodes))

            element.appendChild(template)
          }

          return document.documentElement.outerHTML
        })
      : await page.content()

    return {
      html,
      status: response?.status(),
      ok: response?.ok() ?? false,
    }
  } finally {
    await context?.close()
    await browser?.close()
  }
}

/*

let browser: Browser | undefined
  let context: BrowserContext

  if (isLaunchPersistentContext) {
    context = await chromium.launchPersistentContext('./playwright-profile', {
      headless: false,
    })
  } else {
    browser = await chromium.launch()
    context = await browser.newContext()
  }

  const page = await context.newPage()

  try {
    await page.goto(url, {
      waitUntil: 'networkidle',
    })

    await page.waitForTimeout(waitForTimeout)

    const html = await page.content()

    await fs.writeFile(pathFileAbsOutput, html, 'utf8')

    return {
      html,
    }
  } finally {
    await context.close()
    await browser?.close()
  }
*/

const getHtmlPageHtml = withTryCatchFinallyWrapper<
  GetHtmlPageHtmlParamsType,
  GetHtmlPageHtmlOptionsType,
  GetHtmlPageHtmlResType
>(getHtmlPageHtmlUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetHtmlPageHtmlCaseType = {
  index: number
  description?: string
  params: Parameters<typeof getHtmlPageHtml>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getHtmlPageHtml>[1]
  expected: ReturnType<typeof getHtmlPageHtml>
}

export type {
  GetHtmlPageHtmlCaseType,
  GetHtmlPageHtmlOptionsType,
  GetHtmlPageHtmlParamsType,
  GetHtmlPageHtmlResType,
  GetHtmlPageHtmlType,
}
export { getHtmlPageHtml }
