import { consoler } from '../../sharedNode/consoler'
import {
  type GetHtmlBlocksExtractedCaseType,
  type GetHtmlBlocksExtractedOptionsType,
  type GetHtmlBlocksExtractedParamsType,
  getHtmlBlocksExtracted,
} from './getHtmlBlocksExtracted'
import { getHtmlBlocksExtractedCases } from './getHtmlBlocksExtracted.case'

/**
 * @run npx tsx src/Shared/getHtmlBlocksExtracted.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const {
      index,
      description,
      params,
      options,
      expected,
    } of getHtmlBlocksExtractedCases) {
      const CASE_TO_PICK_UP = 1

      if (index !== CASE_TO_PICK_UP) continue

      const output = await getHtmlBlocksExtracted(params, options)

      consoler(`getHtmlBlocksExtracted [90-${index}]`, {
        description,
        params,
        output,
        expected,
        tested: JSON.stringify(output) === JSON.stringify(expected),
      })
    }
  })()
}
