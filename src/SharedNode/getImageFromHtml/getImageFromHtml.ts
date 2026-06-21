import { basename, join } from 'node:path'
import { chromium } from 'playwright'
import {
  FuncModeEnumType,
  getDateString,
  getRestoredObject,
  withTryCatchFinallyWrapper,
} from 'yourails_common'
import { consoler } from '../consoler'
import { getImageToBase64 } from '../getImageToBase64/getImageToBase64'

enum ServeSourceFileEnum {
  serveAsFile = 'serveAsFile',
  serveAsImage64 = 'serveAsImage64',
}

enum ScalingModeEnum {
  deviceScaleFactor = 'deviceScaleFactor',
  layout = 'layout',
}

export type ConfigFileImageToServeType = {
  serveSourceFile: ServeSourceFileEnum
  pathFileAbs: string
  replacement: string
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

type GetImageFromHtmlOptionsType = {
  isProduction: boolean
  configsFilesImagesToServe?: ConfigFileImageToServeType[]
  funcParent?: string
}

type GetImageFromHtmlResType = string

type GetImageFromHtmlType = (
  params: GetImageFromHtmlParamsType,
  options?: GetImageFromHtmlOptionsType,
) => Promise<GetImageFromHtmlResType>

const optionsDefault = {
  isProduction: true,
  configsFilesImagesToServe: [],
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
    style: styleIn,
    scalingMode = ScalingModeEnum.deviceScaleFactor,
  }: GetImageFromHtmlParamsType,
  { isProduction, configsFilesImagesToServe = [] }: GetImageFromHtmlOptionsType = optionsDefault,
) => {
  let style = styleIn

  const pathFileAbs = pathFileAbsIn ? pathFileAbsIn : join(__dirname, './__output__/temp.png')

  const browser = await chromium.launch({
    headless: isProduction,
    args: ['--allow-file-access-from-files', '--disable-web-security'],
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

  /* If we need to use local image files and serve them as base64 */
  for await (const configFileImageToServe of configsFilesImagesToServe) {
    const { serveSourceFile, pathFileAbs, replacement } = configFileImageToServe
    if (serveSourceFile === ServeSourceFileEnum.serveAsImage64) {
      const imageBase64 = await getImageToBase64({ pathFileAbs })

      /* 
        Use case: background-image: url('data:image/png;base64,__IMAGE_BASE_64__');
      */
      style = getRestoredObject({
        obj: styleIn,
        source: {},
        variablePrefix: '__VARIABLES__.',
        replacements: {
          [replacement]: imageBase64,
        },
      })
    }
  }

  /* If we need to use local image files and serve them as files */
  const configsFilesImagesToServeAsFile = configsFilesImagesToServe.filter(
    (configFileImageToServe: ConfigFileImageToServeType) =>
      configFileImageToServe.serveSourceFile === ServeSourceFileEnum.serveAsFile,
  )

  consoler('getImageFromHtml [140]', { configsFilesImagesToServeAsFile })

  if (configsFilesImagesToServeAsFile.length) {
    /* If we need to serve local files with the local paths 
     for the file with path /Users/admin/.../a1.png
     one can use the in the code 
     background-image: url('http://local-assets/a1.png');
  */
    const { promises: fsa } = await import('fs')

    await page.route('http://local-assets/**', async (route) => {
      const promises = []

      for await (const configFileImageToServe of configsFilesImagesToServeAsFile) {
        const { pathFileAbs, replacement } = configFileImageToServe

        const filename = basename(pathFileAbs)

        /* 
          Use case: background-image: url('http://local-assets/a1.png');
        */
        style = getRestoredObject({
          obj: styleIn,
          source: {},
          variablePrefix: '__VARIABLES__.',
          replacements: {
            [replacement]: filename,
          },
        })

        const image = await fsa.readFile(pathFileAbs)

        console.log('getImageFromHtml [170]', route.request().url())

        promises.push(
          route.fulfill({
            contentType: 'image/png',
            body: image,
          }),
        )
      }

      await Promise.all(promises)
    })
  }

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
export { getImageFromHtml, ScalingModeEnum, ServeSourceFileEnum }

/**
 * @description Here the file is being run directly
 * @run npx tsx src/SharedNode/getImageFromHtml/getImageFromHtml.ts
 * @test pnpm jest getImageFromHtml.test.ts --coverage --collectCoverageFrom="src/SharedNode/getImageFromHtml/getImageFromHtml.ts"
 */
