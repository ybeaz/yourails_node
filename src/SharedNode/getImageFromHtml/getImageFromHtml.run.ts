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
      // const SCALE = 2
      // const IS_PRODUCTION = true // 'What Is Sora? ggg, yyy, ppp'
      // const __TITLE_MAIN_FORMATTED__ =
      //   'OpenClaw Foundation<br />OpenClaw project<br />at a glance'

      // const SCENE_INDEX = 0

      // const dateString = getDateString({
      //   timestamp: new Date(),
      //   dash: true,
      //   hours: true,
      //   minutes: true,
      //   seconds: true,
      //   isUtcMethods: false,
      // })
      // const fileNameMain = `s_${SCENE_INDEX}_${dateString}`
      // const pathFileAbsImageTitle = join(
      //   __dirname,
      //   '.',
      //   '__output__',
      //   `${fileNameMain}_image.png`,
      // )

      // params.pathFileAbs = pathFileAbsImageTitle
      // params.html = __TITLE_MAIN_FORMATTED__
      // params.scale = SCALE

      // options.isProduction = IS_PRODUCTION

      // const WIDTH: number = ImageSizesStandardEnum.LANDSCAPE_WIDTH
      // const HEIGHT: number = ImageSizesStandardEnum.LANDSCAPE_HEIGHT
      // const WIDTH: number = ImageSizesStandardEnum.LANDSCAPE_16x9_WIDTH
      // const HEIGHT: number = ImageSizesStandardEnum.LANDSCAPE_16x9_HEIGHT
      // const WIDTH: number = ImageSizesStandardEnum.PORTRAIT_9x16_WIDTH_L
      // const HEIGHT: number = ImageSizesStandardEnum.PORTRAIT_9x16_HEIGHT_L
      const WIDTH = 550
      const HEIGHT = 980

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
