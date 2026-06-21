import { join } from 'node:path'
import { getRestoredObject, ImageSizesStandardEnum } from 'yourails_common'
import { consoler } from '../consoler'
import { getRunWithSpinner } from '../getRunWithSpinner'
import {
  type GetImageFromHtmlCaseType,
  getImageFromHtml,
  ServeSourceFileEnum,
} from './getImageFromHtml'

/**
 * @run npx tsx src/SharedNode/getImageFromHtml/getImageFromHtml.run.ts
 */
;(async () => {
  const getImageFromHtmlCases = await import('./getImageFromHtml.case').then(
    (m) => m.getImageFromHtmlCases,
  )

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

      // const WIDTH: number = ImageSizesStandardEnum.LANDSCAPE_THUMBNAIL_PLAYLIST_WIDTH
      // const HEIGHT: number = ImageSizesStandardEnum.LANDSCAPE_THUMBNAIL_PLAYLIST_HEIGHT
      const WIDTH: number = ImageSizesStandardEnum.LANDSCAPE_WIDTH
      const HEIGHT: number = ImageSizesStandardEnum.LANDSCAPE_HEIGHT

      params.style = getRestoredObject({
        obj: params.style,
        source: {},
        variablePrefix: '__VARIABLES__.',
        replacements: {
          __WRAPPER_WIDTH__: `${WIDTH}`,
          __WRAPPER_HEIGHT__: `${HEIGHT}`,
        },
      })
      params.width = WIDTH
      params.height = HEIGHT

      options.configsFilesImagesToServe = [
        {
          serveSourceFile: ServeSourceFileEnum.serveAsImage64,
          pathFileAbs:
            '/Users/admin/Dev/yourails_node/src/SharedNode/getImageFromHtml/__mocks__/a1.png',
          replacement: '__IMAGE_BASE_64__',
        },
        // {
        //   serveSourceFile: ServeSourceFileEnum.serveAsFile,
        //   pathFileAbs:
        //     '/Users/admin/Dev/yourails_node/src/SharedNode/getImageFromHtml/__mocks__/a1.png',
        //   replacement: '__IMAGE_FILE_NAME__',
        // },
      ]

      const output: string = await getRunWithSpinner(getImageFromHtml, 'Processing... ')(
        params,
        options,
      )

      consoler(`getImageFromHtml [90-${index}]`, {
        description,
        // params,
        output: `${output.slice(1, 70)}...`,
        expected,
        tested: JSON.stringify(output) === JSON.stringify(expected),
      })
    },
  )

  await Promise.all(promises)
})()
