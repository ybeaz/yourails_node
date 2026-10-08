import { join } from 'node:path'
import { FileTypeEnum, getDateString } from 'yourails_common'
import { consoler } from '../consoler'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import { getWrittenFile3 } from '../getWrittenFile3/getWrittenFile3'
import { getHtmlPageToTextWithSelectors } from './getHtmlPageToTextWithSelectors'
import { getHtmlPageToTextWithSelectorsCases } from './getHtmlPageToTextWithSelectors.case'

/**
 * @run npx tsx src/sharedNode/getHtmlPageToTextWithSelectors/getHtmlPageToTextWithSelectors.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const {
      index,
      description,
      params,
      options,
      expected,
    } of getHtmlPageToTextWithSelectorsCases) {
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

      const { html, text, header, htmlLen, textLen, headerLen } = await getRunWithSpinner(
        getHtmlPageToTextWithSelectors,
      )(params, options)

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

      consoler(`getHtmlPageToTextWithSelectors [50-${index}]`, {
        description,
        params,
        text,
        header,
        htmlLen,
        textLen,
        headerLen,
      })
    }
  })()
}
