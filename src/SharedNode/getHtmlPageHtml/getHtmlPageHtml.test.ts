import { describe, expect, it } from '@jest/globals'
// import { withAssignedDate } from '../withAssignedDate'
import { withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { type GetHtmlPageHtmlCaseType, getHtmlPageHtml } from './getHtmlPageHtml'
import { getHtmlPageHtmlCases } from './getHtmlPageHtml.case'

/**
 * @Description Test to challenge function getHtmlPageHtml
 * @test pnpm jest getHtmlPageHtml.test.ts --coverage --collectCoverageFrom="src/Shared/getHtmlPageHtml.ts"
 */
describe('getHtmlPageHtml', () => {
  it.each(getHtmlPageHtmlCases)(
    '$description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetHtmlPageHtmlCaseType) => {
      let getWithDate = getHtmlPageHtml
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getHtmlPageHtml> = await (
        getWithDate as typeof getHtmlPageHtml
      )(params, options)
      consoler('getHtmlPageHtml.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
