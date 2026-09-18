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

type GetHtmlFromHtmlPageParamsType = {
  url: string
}

type GetHtmlFromHtmlPageOptionsType = {
  waitForTimeout?: number
  isLaunchPersistentContext?: boolean
  isHeadless?: boolean
  waitUntil?: WaitUntilEnum
  isWaitingForLoad?: boolean
  isFlattenShadowDom?: boolean
  gotoTimeout?: 30000
  funcParent?: string
}

type GetHtmlFromHtmlPageResType = { html: string }

type GetHtmlFromHtmlPageType = (
  params: GetHtmlFromHtmlPageParamsType,
  options?: GetHtmlFromHtmlPageOptionsType,
) => Promise<GetHtmlFromHtmlPageResType>

const optionsDefault = {
  waitForTimeout: 2000,
  isLaunchPersistentContext: false,
  isHeadless: true,
  funcParent: 'getHtmlFromHtmlPage',
  waitUntil: WaitUntilEnum.load,
  isWaitingForLoad: false,
  isFlattenShadowDom: false,
  gotoTimeout: 30000,
} satisfies Required<GetHtmlFromHtmlPageOptionsType>

const resDefault: GetHtmlFromHtmlPageResType = { html: '' }

/**
 * @description Function to getHtmlFromHtmlPage
 * @usage
   import { getHtmlFromHtmlPage, GetHtmlFromHtmlPageParamsType, GetHtmlFromHtmlPageOptionsType } from './getHtmlFromHtmlPage/getHtmlFromHtmlPage'
   const getHtmlFromHtmlPageParams: GetHtmlFromHtmlPageParamsType = {}
   const getHtmlFromHtmlPageOptions: GetHtmlFromHtmlPageOptionsType = {}
   getHtmlFromHtmlPage(getHtmlFromHtmlPageParams, getHtmlFromHtmlPageOptions)
 */
const getHtmlFromHtmlPageUnsafe: GetHtmlFromHtmlPageType = async (
  { url }: GetHtmlFromHtmlPageParamsType,
  {
    waitForTimeout = 2000,
    isLaunchPersistentContext = false,
    isHeadless = true,
    waitUntil = WaitUntilEnum.load,
    isWaitingForLoad = false,
    isFlattenShadowDom = false,
    gotoTimeout = 30000,
  }: GetHtmlFromHtmlPageOptionsType = optionsDefault,
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

const getHtmlFromHtmlPage = withTryCatchFinallyWrapper<
  GetHtmlFromHtmlPageParamsType,
  GetHtmlFromHtmlPageOptionsType,
  GetHtmlFromHtmlPageResType
>(getHtmlFromHtmlPageUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetHtmlFromHtmlPageCaseType = {
  index: number
  description?: string
  params: Parameters<typeof getHtmlFromHtmlPage>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getHtmlFromHtmlPage>[1]
  expected: ReturnType<typeof getHtmlFromHtmlPage>
}

export type {
  GetHtmlFromHtmlPageCaseType,
  GetHtmlFromHtmlPageOptionsType,
  GetHtmlFromHtmlPageParamsType,
  GetHtmlFromHtmlPageResType,
  GetHtmlFromHtmlPageType,
}
export { getHtmlFromHtmlPage }
