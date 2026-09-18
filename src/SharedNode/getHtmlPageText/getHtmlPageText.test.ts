import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'
import { consoler } from '../../sharedNode/consoler'
import { type GetHtmlPageTextCaseType, getHtmlPageText } from './getHtmlPageText'
import { getHtmlPageTextCases } from './getHtmlPageText.case'

/**
 * @Description Test to challenge function getHtmlPageText
 * @test pnpm jest getHtmlPageText.test.ts --coverage --collectCoverageFrom="src/sharedNode/getHtmlPageText/getHtmlPageText.ts"
 */
describe('getHtmlPageText', () => {
  it.each(getHtmlPageTextCases)(
    '$description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetHtmlPageTextCaseType) => {
      let getWithDate = getHtmlPageText
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getHtmlPageText> = await (
        getWithDate as typeof getHtmlPageText
      )(params, options)
      consoler('getHtmlPageText.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
