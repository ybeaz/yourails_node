import { join } from 'node:path'
import {
  getDateString,
  getRestoredObject,
  ImageSizesStandardEnum,
  ServeSourceForReplacementEnum,
} from 'yourails_common'
import { consoler } from '../consoler'
import { getImageToBase64 } from '../getImageToBase64/getImageToBase64'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import { type GetImageFromHtmlCaseType, getImageFromHtml } from './getImageFromHtml'
import { getImageFromHtmlCases } from './getImageFromHtml.case'

/**
 * @run npx tsx src/SharedNode/getImageFromHtml/getImageFromHtml.run.ts
 */
;(async () => {
  const promises = getImageFromHtmlCases.map(
    async (
      {
        description,
        params,
        options = { isProduction: false },
        expected,
      }: GetImageFromHtmlCaseType,
      index: number,
    ) => {
      // const WIDTH: number = ImageSizesStandardEnum.LANDSCAPE_16x9_WIDTH_S
      // const HEIGHT: number = ImageSizesStandardEnum.LANDSCAPE_16x9_HEIGHT_S
      // const IMAGE_BASE_64_PNG = join(__dirname, '__mocks__', 's_1_2026-07-13-19-53-18_imageRaw.png') // 16x9

      const WIDTH = ImageSizesStandardEnum.PORTRAIT_9x16_WIDTH_S
      const HEIGHT = ImageSizesStandardEnum.PORTRAIT_9x16_HEIGHT_S
      const IMAGE_BASE_64_PNG = join(__dirname, '__mocks__', 's_0_2026-08-16-21-46-40_image.png') // 9x16

      const imageBase64String2 = await getImageToBase64({
        pathFileAbs: IMAGE_BASE_64_PNG,
      })

      options.configsSourceToServe?.push({
        serveSourceAsFor: ServeSourceForReplacementEnum.serveStringAsString,
        source: imageBase64String2,
        replacementName: '__IMAGE_BASE_64__',
      })

      // options.isProduction = IS_PRODUCTION

      params.width = WIDTH
      params.height = HEIGHT

      const output = await getRunWithSpinner(getImageFromHtml, 'Processing... ')(params, options)

      consoler(`getImageFromHtml [120-${index}]`, {
        description,
        // params,
        output: `${output.imageBase64.slice(1, 70)}...`,
        expected,
        tested: JSON.stringify(output) === JSON.stringify(expected),
      })
    },
  )

  await Promise.all(promises)
})()
