import { describe, expect, it } from '@jest/globals'
// import { withAssignedDate } from '../withAssignedDate'
import { withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { type GetHtmlFromHtmlPageCaseType, getHtmlFromHtmlPage } from './getHtmlFromHtmlPage'
import { getHtmlFromHtmlPageCases } from './getHtmlFromHtmlPage.case'

/**
 * @Description Test to challenge function getHtmlFromHtmlPage
 * @test pnpm jest getHtmlFromHtmlPage.test.ts --coverage --collectCoverageFrom="src/Shared/getHtmlFromHtmlPage.ts"
 */
describe('getHtmlFromHtmlPage', () => {
  it.each(getHtmlFromHtmlPageCases)(
    '$description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetHtmlFromHtmlPageCaseType) => {
      let getWithDate = getHtmlFromHtmlPage
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getHtmlFromHtmlPage> = await (
        getWithDate as typeof getHtmlFromHtmlPage
      )(params, options)
      consoler('getHtmlFromHtmlPage.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
