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
      const WIDTH: number = ImageSizesStandardEnum.PORTRAIT_9x16_WIDTH_L
      const HEIGHT: number = ImageSizesStandardEnum.PORTRAIT_9x16_HEIGHT_L

      // const TITLE_MAIN_FORMATTED = 'Python programming language. Strings'
      // const SUBTITLE_MAIN =
      //   'Comprehensive guide to Python strings: creation, methods, formatting, and more.'

      // params.html = getRestoredObject({
      //   obj: params.html,
      //   source: {},
      //   variablePrefix: '__VARIABLES__.',
      //   replacements: {
      //     __TITLE_MAIN_FORMATTED__: `${TITLE_MAIN_FORMATTED}`,
      //     __DIV_SUBTITLE_MAIN__: `<div class="h2">${SUBTITLE_MAIN}</div>`,
      //     __POSITION_IN_RECTANGLE_CSS__: `top: calc(40px); right: calc(40px);`,
      //   },
      // })

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
