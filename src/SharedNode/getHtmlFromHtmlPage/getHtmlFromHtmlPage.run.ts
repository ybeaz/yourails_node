import { join } from 'node:path'
import {
  FileTypeEnum,
  GetHtmlBlockExtractedResType,
  GetHtmlBlocksExtractedOptionsType,
  GetHtmlBlocksExtractedParamsType,
  GetHtmlToTextConvertOptionsType,
  GetHtmlToTextConvertParamsType,
  getDateString,
  getHtmlBlocksExtracted,
  getHtmlToTextConvert,
} from 'yourails_common'
import { consoler } from '../consoler'
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
      const CASE_TO_PICK_UP = 2

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

      /* EXTRACT HTML STRING */

      const { html } = await getRunWithSpinner(getHtmlFromHtmlPage)(params, options)

      const pathFileAbs = join(__dirname, '__output__', `${dateString}_html.txt`)

      await getWrittenFile3(
        { pathFileAbs: pathFileAbs, data: html },
        { fileType: FileTypeEnum.txt, isOverwrite: true },
      )

      /* EXTRACT HTML BLOCKS BY SELECTORS */

      const getHtmlBlocksExtractedParams: GetHtmlBlocksExtractedParamsType = {
        html,
        cssSelectorsArr: [
          '#content > div.layout__header.reference-layout__header > h1',
          '#content > div.layout__header.reference-layout__header > section',
          // 'section[aria-labelledby="syntax"]',
          // 'section[aria-labelledby="description"]',
          // 'section[aria-labelledby="examples"]',
          'AFTER:section[aria-labelledby="syntax"]BEFORE:section[aria-labelledby="specifications"]',
          // 'AFTER:section[aria-labelledby="try_it"]BEFORE:section[aria-labelledby="examples"]',
        ],
      }
      const getHtmlBlocksExtractedOptions: GetHtmlBlocksExtractedOptionsType = {}
      const htmlBlocksExtracted: GetHtmlBlockExtractedResType[] = await getHtmlBlocksExtracted(
        getHtmlBlocksExtractedParams,
        getHtmlBlocksExtractedOptions,
      )

      const pathFileAbs2 = join(__dirname, '__output__', `${dateString}_html.json`)

      await getWrittenFile3(
        { pathFileAbs: pathFileAbs2, data: htmlBlocksExtracted },
        { fileType: FileTypeEnum.json, isOverwrite: true },
      )

      consoler(`\n\n\n\n\ngetHtmlFromHtmlPage EXTRACT HTML BLOCKS BY SELECTORS [85-2-${index}]`, {
        description,
        htmlBlocksExtracted,
      })

      /* CONVERT HTML BLOCKS TO TEXT BLOCKS */

      const htmlTextsExtracted = htmlBlocksExtracted
        // .filter((_, index) => index === 5)
        .map(({ html }: GetHtmlBlockExtractedResType) => {
          const getHtmlToTextConvertParams: GetHtmlToTextConvertParamsType = { html }
          const getHtmlToTextConvertOptions: GetHtmlToTextConvertOptionsType = {}

          // consoler('\n\n\n\n\ngetHtmlFromHtmlPage.run [100]', { html })

          const textString = getHtmlToTextConvert(
            getHtmlToTextConvertParams,
            getHtmlToTextConvertOptions,
          )

          // consoler('\n\n\n\n\ngetHtmlFromHtmlPage.run [105]', { textString })

          return textString
        })

      const pathFileAbs3 = join(__dirname, '__output__', `${dateString}_text.json`)

      await getWrittenFile3(
        { pathFileAbs: pathFileAbs3, data: htmlTextsExtracted },
        { fileType: FileTypeEnum.json, isOverwrite: true },
      )

      consoler(`\n\n\n\n\ngetHtmlFromHtmlPage CONVERT HTML BLOCKS TO TEXT BLOCKS [85-3-${index}]`, {
        htmlBlocksExtractedLen: htmlBlocksExtracted.length,
        htmlTextsExtracted,
      })
    }
  })()
}
