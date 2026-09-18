import { join } from 'node:path'
import { FileTypeEnum, getDateString } from 'yourails_common'
import { consoler } from '../consoler'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import { getWrittenFile3 } from '../getWrittenFile3/getWrittenFile3'
import {
  type GetHtmlPageTextCaseType,
  type GetHtmlPageTextOptionsType,
  type GetHtmlPageTextParamsType,
  getHtmlPageText,
} from './getHtmlPageText'
import { getHtmlPageTextCases } from './getHtmlPageText.case'

/**
 * @run npx tsx src/sharedNode/getHtmlPageText/getHtmlPageText.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const { index, description, params, options, expected } of getHtmlPageTextCases) {
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

      const { html, text } = await getRunWithSpinner(getHtmlPageText)(params, options)

      const pathFileAbs = join(__dirname, '__output__', `${dateString}_html.txt`)

      await getWrittenFile3(
        { pathFileAbs: pathFileAbs, data: html },
        { fileType: FileTypeEnum.txt, isOverwrite: true },
      )

      const pathFileAbs2 = join(__dirname, '__output__', `${dateString}_text.txt`)

      await getWrittenFile3(
        { pathFileAbs: pathFileAbs2, data: text },
        { fileType: FileTypeEnum.txt, isOverwrite: true },
      )

      consoler(`getHtmlPageText [50-${index}]`, {
        description,
        params,
        text,
      })
    }
  })()
}
