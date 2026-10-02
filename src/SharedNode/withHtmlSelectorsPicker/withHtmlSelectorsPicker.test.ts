import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'
import { consoler } from '../../sharedNode/consoler'
import {
  type WithHtmlSelectorsPickerCaseType,
  withHtmlSelectorsPicker,
} from './withHtmlSelectorsPicker'
import { withHtmlSelectorsPickerCases } from './withHtmlSelectorsPicker.case'

/**
 * @Description Test to challenge function withHtmlSelectorsPicker
 * @test pnpm jest withHtmlSelectorsPicker.test.ts --coverage --collectCoverageFrom="src/sharedNode/withHtmlSelectorsPicker/withHtmlSelectorsPicker.ts"
 */
describe('withHtmlSelectorsPicker', () => {
  it.each(withHtmlSelectorsPickerCases)(
    '$index $description',
    async ({
      description,
      func,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: WithHtmlSelectorsPickerCaseType) => {
      let getWithDate = withHtmlSelectorsPicker
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output = await (getWithDate as typeof withHtmlSelectorsPicker)(func)(params, options)
      consoler('withHtmlSelectorsPicker.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
