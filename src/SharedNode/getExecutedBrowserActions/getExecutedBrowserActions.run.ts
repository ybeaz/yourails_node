import { getRunWithSpinner } from 'yourails_node'
import { consoler } from '../../sharedNode/consoler'
import {
  type GetExecutedBrowserActionsCaseType,
  type GetExecutedBrowserActionsOptionsType,
  type GetExecutedBrowserActionsParamsType,
  getExecutedBrowserActions,
} from './getExecutedBrowserActions'
import { getExecutedBrowserActionsCases } from './getExecutedBrowserActions.case'

/**
 * @run npx tsx src/sharedNode/getExecutedBrowserActions/getExecutedBrowserActions.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const {
      index,
      description,
      params: getExecutedBrowserActionsParams,
      options: getExecutedBrowserActionsOptions,
      expected: _,
    } of getExecutedBrowserActionsCases) {
      const CASE_TO_PICK_UP = 2

      if (index !== CASE_TO_PICK_UP) continue

      const output = await getExecutedBrowserActions(
        getExecutedBrowserActionsParams,
        getExecutedBrowserActionsOptions,
      )

      consoler(`getExecutedBrowserActions [30-${index}]`, {
        index,
        description,
        getExecutedBrowserActionsParams,
        getExecutedBrowserActionsOptions,
        output,
      })
    }
  })()
}
