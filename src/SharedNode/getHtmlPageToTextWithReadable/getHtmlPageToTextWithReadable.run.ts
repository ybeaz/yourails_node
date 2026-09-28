import { join } from 'node:path'
import { FileTypeEnum, getDateString } from 'yourails_common'
import { getRunWithSpinner } from 'yourails_node'
import { consoler } from '../../sharedNode/consoler'
import {
  GetHtmlFromHtmlPageOptionsType,
  GetHtmlFromHtmlPageParamsType,
  getHtmlFromHtmlPage,
} from '../getHtmlFromHtmlPage/getHtmlFromHtmlPage'
import {
  GetWrittenFile3OptionsType,
  GetWrittenFile3ParamsType,
  getWrittenFile3,
} from '../getWrittenFile3/getWrittenFile3'
import {
  type GetHtmlPageToTextWithReadableOptionsType,
  type GetHtmlPageToTextWithReadableParamsType,
  type GetHtmlPageToTextWithReadableResType,
  getHtmlPageToTextWithReadable,
} from './getHtmlPageToTextWithReadable'
import { getHtmlPageToTextWithReadableCases } from './getHtmlPageToTextWithReadable.case'

/**
 * @run npx tsx src/sharedNode/getHtmlPageToTextWithReadable/getHtmlPageToTextWithReadable.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const {
      index,
      description,
      params: getHtmlPageToTextWithReadableParams,
      options: getHtmlPageToTextWithReadableOptions,
      expected: _,
    } of getHtmlPageToTextWithReadableCases) {
      const CASE_TO_PICK_UP = 0

      if (index !== CASE_TO_PICK_UP) continue

      const getHtmlFromHtmlPageParams: GetHtmlFromHtmlPageParamsType = {
        url: 'https://en.wikipedia.org/wiki/Arkady_and_Boris_Strugatsky',
      }
      const getHtmlFromHtmlPageOptions: GetHtmlFromHtmlPageOptionsType = {}
      const { html: htmlIn } = await getRunWithSpinner(getHtmlFromHtmlPage)(
        getHtmlFromHtmlPageParams,
        getHtmlFromHtmlPageOptions,
      )

      getHtmlPageToTextWithReadableParams.html = htmlIn

      const { header, text } = await getRunWithSpinner(getHtmlPageToTextWithReadable)(
        getHtmlPageToTextWithReadableParams,
        getHtmlPageToTextWithReadableOptions,
      )

      const dateString = getDateString({
        timestamp: new Date(),
        dash: true,
        hours: true,
        minutes: true,
        seconds: true,
        isUtcMethods: false,
      })

      const pathFileAbs = join(__dirname, '__output__', `${dateString}_imageRaw.txt`)

      const getWrittenFile3Params: GetWrittenFile3ParamsType = {
        pathFileAbs,
        data: `${header}\n\n${text}`,
      }
      const getWrittenFile3Options: GetWrittenFile3OptionsType = { fileType: FileTypeEnum.txt }
      await getWrittenFile3(getWrittenFile3Params, getWrittenFile3Options)

      consoler(`getHtmlPageToTextWithReadable [30-${index}]`, {
        index,
        description,
        // getHtmlPageToTextWithReadableParams,
        // getHtmlPageToTextWithReadableOptions,
        // output,
      })
    }
  })()
}
