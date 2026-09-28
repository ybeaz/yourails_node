import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'
import { consoler } from '../../sharedNode/consoler'
import {
  type GetHtmlPageToTextWithSelectorsCaseType,
  getHtmlPageToTextWithSelectors,
} from './getHtmlPageToTextWithSelectors'
import { getHtmlPageToTextWithSelectorsCases } from './getHtmlPageToTextWithSelectors.case'

/**
 * @Description Test to challenge function getHtmlPageToTextWithSelectors
 * @test pnpm jest getHtmlPageToTextWithSelectors.test.ts --coverage --collectCoverageFrom="src/sharedNode/getHtmlPageToTextWithSelectors/getHtmlPageToTextWithSelectors.ts"
 */
describe('getHtmlPageToTextWithSelectors', () => {
  it.each(getHtmlPageToTextWithSelectorsCases)(
    '$description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetHtmlPageToTextWithSelectorsCaseType) => {
      let getWithDate = getHtmlPageToTextWithSelectors
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getHtmlPageToTextWithSelectors> = await (
        getWithDate as typeof getHtmlPageToTextWithSelectors
      )(params, options)
      consoler('getHtmlPageToTextWithSelectors.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
