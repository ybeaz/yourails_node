import { describe, expect, it } from '@jest/globals'
// import { withAssignedDate } from '../withAssignedDate'
import { withAssignedDate } from 'yourails_common'
import { consoler } from 'yourails_node/consoler'
import { type GetHtmlPageContentCaseType, getHtmlPageContent } from './getHtmlPageContent'
import { getHtmlPageContentCases } from './getHtmlPageContent.case'

/**
 * @Description Test to challenge function getHtmlPageContent
 * @test pnpm jest getHtmlPageContent.test.ts --coverage --collectCoverageFrom="src/Shared/getHtmlPageContent.ts"
 */
describe('getHtmlPageContent', () => {
  it.each(getHtmlPageContentCases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetHtmlPageContentCaseType) => {
    let getWithDate = getHtmlPageContent
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

    const output: ReturnType<typeof getHtmlPageContent> = await (
      getWithDate as typeof getHtmlPageContent
    )(params, options)
    consoler('getHtmlPageContent.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
