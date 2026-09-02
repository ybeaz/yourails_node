import fs from 'node:fs/promises'
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

type GetHtmlPageContentParamsType = {
  url: string
}

type GetHtmlPageContentOptionsType = {
  waitForTimeout?: number
  isLaunchPersistentContext?: boolean
  isHeadless?: boolean
  waitUntil?: WaitUntilEnum
  pathFileAbs?: string
  funcParent?: string
}

type GetHtmlPageContentResType = { html: string }

type GetHtmlPageContentType = (
  params: GetHtmlPageContentParamsType,
  options?: GetHtmlPageContentOptionsType,
) => Promise<GetHtmlPageContentResType>

const optionsDefault = {
  waitForTimeout: 2000,
  isLaunchPersistentContext: false,
  isHeadless: true,
  funcParent: 'getHtmlPageContent',
  pathFileAbs: join(__dirname, '__output__', `page.html`),
  waitUntil: WaitUntilEnum.load,
} satisfies Required<GetHtmlPageContentOptionsType>

const resDefault: GetHtmlPageContentResType = { html: '' }

/**
 * @description Function to getHtmlPageContent
 * @usage @import import { getHtmlPageContent, GetHtmlPageContentParamsType, GetHtmlPageContentOptionsType } from './getHtmlPageContent/getHtmlPageContent'
   const getHtmlPageContentParams: GetHtmlPageContentParamsType = {}
   const getHtmlPageContentOptions: GetHtmlPageContentOptionsType = {}
   getHtmlPageContent(getHtmlPageContentParams, getHtmlPageContentOptions)
 */
const getHtmlPageContentUnsafe: GetHtmlPageContentType = async (
  { url }: GetHtmlPageContentParamsType,
  {
    waitForTimeout = 2000,
    isLaunchPersistentContext = false,
    isHeadless = true,
    waitUntil = WaitUntilEnum.load,
    pathFileAbs = join(__dirname, '__output__', `page.html`),
  }: GetHtmlPageContentOptionsType = optionsDefault,
) => {
  let browser: Browser | undefined
  let context: BrowserContext

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
  await page.goto(url, {
    waitUntil, // 'domcontentloaded'
  })

  // additional sleep, e.g. 3 seconds
  await page.waitForTimeout(waitForTimeout)

  // This is the current DOM, similar to what you see in DevTools Elements
  const html = await page.content()

  if (pathFileAbs)
    await getWrittenFile2(
      { pathFileAbs, data: html },
      { fileType: FileTypeEnum.txt, isOverwrite: true },
    )

  await context.close()
  await browser?.close()

  return {
    html,
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

const getHtmlPageContent = withTryCatchFinallyWrapper<
  GetHtmlPageContentParamsType,
  GetHtmlPageContentOptionsType,
  GetHtmlPageContentResType
>(getHtmlPageContentUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetHtmlPageContentCaseType = {
  description?: string
  params: Parameters<typeof getHtmlPageContent>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getHtmlPageContent>[1]
  expected: ReturnType<typeof getHtmlPageContent>
}

export type {
  GetHtmlPageContentCaseType,
  GetHtmlPageContentOptionsType,
  GetHtmlPageContentParamsType,
  GetHtmlPageContentResType,
  GetHtmlPageContentType,
}
export { getHtmlPageContent }
