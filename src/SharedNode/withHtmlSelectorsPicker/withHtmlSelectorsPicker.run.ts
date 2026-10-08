import { getRunWithSpinner } from 'yourails_node'
import { consoler } from '../../sharedNode/consoler'
import {
  type WithHtmlSelectorsPickerCaseType,
  type WithHtmlSelectorsPickerOptionsType,
  type WithHtmlSelectorsPickerParamsType,
  withHtmlSelectorsPicker,
} from './withHtmlSelectorsPicker'
import { withHtmlSelectorsPickerCases } from './withHtmlSelectorsPicker.case'

/**
 * @run npx tsx src/sharedNode/withHtmlSelectorsPicker/withHtmlSelectorsPicker.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const {
      index,
      description,
      func,
      params: withHtmlSelectorsPickerParams,
      options: withHtmlSelectorsPickerOptions,
      expected: _,
    } of withHtmlSelectorsPickerCases) {
      const CASE_TO_PICK_UP = 1

      if (index !== CASE_TO_PICK_UP) continue

      const output = await withHtmlSelectorsPicker(func)(
        withHtmlSelectorsPickerParams,
        withHtmlSelectorsPickerOptions,
      )

      consoler(`withHtmlSelectorsPicker [30-${index}]`, {
        index,
        description,
        // withHtmlSelectorsPickerParams,
        // withHtmlSelectorsPickerOptions,
        // output,
      })
    }
  })()
}
