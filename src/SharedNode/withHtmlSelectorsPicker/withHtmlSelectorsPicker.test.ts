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
 * @test pnpm jest withHtmlSelectorsPicker.test.ts --coverage --collectCoverageFrom="src/Shared/withHtmlSelectorsPicker.ts"
 */
describe('withHtmlSelectorsPicker', () => {
  it.each(withHtmlSelectorsPickerCases)(
    '$index $description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: WithHtmlSelectorsPickerCaseType) => {
      let getWithDate = withHtmlSelectorsPicker
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof withHtmlSelectorsPicker> = await (
        getWithDate as typeof withHtmlSelectorsPicker
      )(params, options)
      consoler('withHtmlSelectorsPicker.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
