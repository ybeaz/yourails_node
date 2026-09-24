import { getRunWithSpinner } from 'yourails_node'
import { consoler } from '../../sharedNode/consoler'
import {
  type GetHtmlSnippetFromItemsCaseType,
  type GetHtmlSnippetFromItemsOptionsType,
  type GetHtmlSnippetFromItemsParamsType,
  getHtmlSnippetFromItems,
} from './getHtmlSnippetFromItems'
import { getHtmlSnippetFromItemsCases } from './getHtmlSnippetFromItems.case'

/**
 * @run npx tsx src/Shared/getHtmlSnippetFromItems.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const {
      index,
      description,
      params: getHtmlSnippetFromItemsParams,
      options: getHtmlSnippetFromItemsOptions,
      expected: _,
    } of getHtmlSnippetFromItemsCases) {
      const CASE_TO_PICK_UP = 0

      if (index !== CASE_TO_PICK_UP) continue

      const output = await getHtmlSnippetFromItems(
        getHtmlSnippetFromItemsParams,
        getHtmlSnippetFromItemsOptions,
      )

      consoler(`getHtmlSnippetFromItems [30-${index}]`, {
        index,
        description,
        getHtmlSnippetFromItemsParams,
        getHtmlSnippetFromItemsOptions,
        output,
      })
    }
  })()
}
