import { join } from 'node:path'
import { FileTypeEnum } from 'yourails_common'
import { consoler } from '../../sharedNode/consoler'
import {
  GetReadFile2OptionsType,
  GetReadFile2ParamsType,
  getReadFile2,
} from '../getReadFile2/getReadFile2'
import {
  type GetHtmlJsonLdExtractedCaseType,
  type GetHtmlJsonLdExtractedOptionsType,
  type GetHtmlJsonLdExtractedParamsType,
  getHtmlJsonLdExtracted,
} from './getHtmlJsonLdExtracted'
import { getHtmlJsonLdExtractedCases } from './getHtmlJsonLdExtracted.case'

/**
 * @run npx tsx src/sharedNode/getHtmlJsonLdExtracted/getHtmlJsonLdExtracted.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const {
      index,
      description,
      params,
      options,
      expected,
    } of getHtmlJsonLdExtractedCases) {
      const CASE_TO_PICK_UP = 0

      if (index !== CASE_TO_PICK_UP) continue

      const getReadFile2Params: GetReadFile2ParamsType = {
        pathFileAbs: join(__dirname, '__mocks__', '2026-09-18-06-43-00_html.txt'),
      }
      const getReadFile2Options: GetReadFile2OptionsType = { fileType: FileTypeEnum.txt }
      const html: string = (await getReadFile2(getReadFile2Params, getReadFile2Options)) as string

      params.html = html

      const output = await getHtmlJsonLdExtracted(params, options)

      consoler(`getHtmlJsonLdExtracted [90-${index}]`, {
        description,
        params,
        html,
        output,
      })
    }
  })()
}
