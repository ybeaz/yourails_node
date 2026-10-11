import { join } from 'node:path'
import {
  FileTypeEnum,
  GetHtmlToTextConvertOptionsType,
  GetHtmlToTextConvertParamsType,
  getDateString,
  getHtmlToTextConvert,
} from 'yourails_common'
import { consoler } from '../consoler'
import {
  GetHtmlBlockExtractedResType,
  GetHtmlBlocksExtractedOptionsType,
  GetHtmlBlocksExtractedParamsType,
  getHtmlBlocksExtracted,
} from '../getHtmlBlocksExtracted/getHtmlBlocksExtracted'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import { getWrittenFile3 } from '../getWrittenFile3/getWrittenFile3'
import {
  type GetHtmlFromHtmlPageCaseType,
  type GetHtmlFromHtmlPageOptionsType,
  type GetHtmlFromHtmlPageParamsType,
  getHtmlFromHtmlPage,
} from './getHtmlFromHtmlPage'
import { getHtmlFromHtmlPageCases } from './getHtmlFromHtmlPage.case'

/**
 * @run npx tsx src/sharedNode/getHtmlFromHtmlPage/getHtmlFromHtmlPage.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const { index, description, params, options } of getHtmlFromHtmlPageCases) {
      const CASE_TO_PICK_UP = 5

      if (index !== CASE_TO_PICK_UP) continue

      const dateString = getDateString({
        timestamp: new Date(),
        dash: true,
        hours: true,
        minutes: true,
        seconds: true,
        rest: false,
        style: 'military',
        isUtcMethods: false,
      })

      /* LOAD HTML STRING */

      const { html } = await getRunWithSpinner(getHtmlFromHtmlPage)(params, options)

      const pathFileAbs = join(__dirname, '__output__', `${dateString}_html.txt`)

      await getWrittenFile3(
        { pathFileAbs: pathFileAbs, data: html },
        { fileType: FileTypeEnum.txt, isOverwrite: true },
      )

      /* EXTRACT HTML BLOCKS BY SELECTORS */

      // const getHtmlBlocksExtractedParams: GetHtmlBlocksExtractedParamsType = {
      //   html,
      //   cssSelectorsArr: [
      //     '#firstHeading',
      //     '#content > div.layout__header.reference-layout__header > section',
      //     'AFTER_INCLUDE:section[data-mw-section-id="0"]BEFORE_INCLUDE:section[data-mw-section-id="4"]',
      //   ],
      // }
      // const getHtmlBlocksExtractedOptions: GetHtmlBlocksExtractedOptionsType = {}
      // const htmlBlocksExtracted: GetHtmlBlockExtractedResType[] = await getHtmlBlocksExtracted(
      //   getHtmlBlocksExtractedParams,
      //   getHtmlBlocksExtractedOptions,
      // )

      // const pathFileAbs2 = join(__dirname, '__output__', `${dateString}_html.json`)

      // await getWrittenFile3(
      //   { pathFileAbs: pathFileAbs2, data: htmlBlocksExtracted },
      //   { fileType: FileTypeEnum.json, isOverwrite: true },
      // )

      // consoler(`\n\n\n\n\ngetHtmlFromHtmlPage EXTRACT HTML BLOCKS BY SELECTORS [85-2-${index}]`, {
      //   description,
      //   htmlBlocksExtracted,
      // })

      /* CONVERT HTML BLOCKS TO TEXT BLOCKS */

      // const htmlTextsExtracted = htmlBlocksExtracted
      //   // .filter((_, index) => index === 5)
      //   .map(({ html }: GetHtmlBlockExtractedResType) => {
      //     const getHtmlToTextConvertParams: GetHtmlToTextConvertParamsType = { html }
      //     const getHtmlToTextConvertOptions: GetHtmlToTextConvertOptionsType = {}

      //     // consoler('\n\n\n\n\ngetHtmlFromHtmlPage.run [100]', { html })

      //     const textString = getHtmlToTextConvert(
      //       getHtmlToTextConvertParams,
      //       getHtmlToTextConvertOptions,
      //     )

      //     // consoler('\n\n\n\n\ngetHtmlFromHtmlPage.run [105]', { textString })

      //     return textString
      //   })

      const getHtmlToTextConvertParams: GetHtmlToTextConvertParamsType = { html }
      const getHtmlToTextConvertOptions: GetHtmlToTextConvertOptionsType = {}
      const htmlTextsExtracted = await getHtmlToTextConvert(
        getHtmlToTextConvertParams,
        getHtmlToTextConvertOptions,
      )

      const pathFileAbs3 = join(__dirname, '__output__', `${dateString}_text.json`)

      await getWrittenFile3(
        { pathFileAbs: pathFileAbs3, data: htmlTextsExtracted },
        { fileType: FileTypeEnum.json, isOverwrite: true },
      )

      consoler(`\n\n\n\n\ngetHtmlFromHtmlPage CONVERT HTML BLOCKS TO TEXT BLOCKS [85-3-${index}]`, {
        // htmlBlocksExtractedLen: htmlBlocksExtracted?.length,
        htmlTextsExtracted,
      })
    }
  })()
}
