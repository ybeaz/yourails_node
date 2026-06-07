import { join } from 'node:path'
import { chromium } from 'playwright'
import { FuncModeEnumType, getDateString, withTryCatchFinallyWrapper } from 'yourails_common'
import { consoler } from '../consoler'
import { getImageToBase64 } from '../getImageToBase64/getImageToBase64'

enum ScalingModeEnum {
  deviceScaleFactor = 'deviceScaleFactor',
  layout = 'layout',
}

type GetImageFromHtmlParamsType = {
  html: string
  style: string
  pathFileAbs: string
  width: number
  height: number
  scale: number
  scalingMode?: ScalingModeEnum
}

type GetImageFromHtmlOptionsType = { isProduction: boolean; funcParent?: string }

type GetImageFromHtmlResType = unknown

type GetImageFromHtmlType = (
  params: GetImageFromHtmlParamsType,
  options?: GetImageFromHtmlOptionsType,
) => GetImageFromHtmlResType

const optionsDefault = {
  isProduction: true,
  funcParent: 'getImageFromHtml',
} satisfies Required<GetImageFromHtmlOptionsType>

/**
 * @prompt Context: Javascript chanllendge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
 */

/**
 * @description Function to getImageFromHtml
 *        Dimensions size: 1536x1024
 * @param deviceScaleFactor values:
          1	standard DPI	fastest, lowest quality
          1.5	mild upscaling	good compromise
          ✅ 2	Retina equivalent most common
          3	very sharp	high-end rendering
          4+	extreme	⚠️ rarely worth it
 * @import import { getImageFromHtml } from './getImageFromHtml'
 */
const getImageFromHtmlUnsafe: GetImageFromHtmlType = async (
  {
    html,
    pathFileAbs: pathFileAbsIn,
    width: widthIn,
    height: heightIn,
    scale,
    style,
    scalingMode = ScalingModeEnum.deviceScaleFactor,
  }: GetImageFromHtmlParamsType,
  { isProduction }: GetImageFromHtmlOptionsType = optionsDefault,
) => {
  const pathFileAbs = pathFileAbsIn ? pathFileAbsIn : join(__dirname, 'xxx.png')

  const browser = await chromium.launch({
    headless: isProduction,
    args: [],
  })

  const air = 4

  let width = widthIn
  let height = heightIn + air

  let newPageConfig: { viewport: { width: number; height: number }; deviceScaleFactor?: number } = {
    viewport: { width, height },
    deviceScaleFactor: scale,
  }

  if (scalingMode === ScalingModeEnum.layout) {
    width = widthIn * scale
    height = heightIn * scale + air
    newPageConfig = { viewport: { width, height } }
  }

  const page = await browser.newPage(newPageConfig)

  const fullHtml = `
    <html lang="en">
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: white;
          }
        </style>
        ${style}
      </head>
      <body>
        ${html}
      </body>
    </html>
  `

  await page.setContent(fullHtml, { waitUntil: 'networkidle' })

  await page.screenshot({
    path: pathFileAbs,
    fullPage: false,
  })

  if (isProduction) await browser.close()

  const imageBase64 = await getImageToBase64({ pathFileAbs })

  return imageBase64
}

const resDefault: GetImageFromHtmlResType = ''

const getImageFromHtml = withTryCatchFinallyWrapper<
  GetImageFromHtmlParamsType,
  GetImageFromHtmlOptionsType,
  GetImageFromHtmlResType
>(getImageFromHtmlUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetImageFromHtmlCaseType = {
  description?: string
  params: Parameters<typeof getImageFromHtml>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options: Parameters<typeof getImageFromHtml>[1]
  expected: ReturnType<typeof getImageFromHtml>
}

export type {
  GetImageFromHtmlCaseType,
  GetImageFromHtmlOptionsType,
  GetImageFromHtmlParamsType,
  GetImageFromHtmlResType,
  GetImageFromHtmlType,
}
export { getImageFromHtml, ScalingModeEnum }

/**
 * @description Here the file is being run directly
 * @run npx tsx src/SharedNode/getImageFromHtml/getImageFromHtml.ts
 * @test pnpm jest getImageFromHtml.test.ts --coverage --collectCoverageFrom="src/SharedNode/getImageFromHtml/getImageFromHtml.ts"
 */
