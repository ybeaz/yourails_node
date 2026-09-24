import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'
import { consoler } from '../../sharedNode/consoler'
import {
  type GetHtmlSnippetFromItemsCaseType,
  getHtmlSnippetFromItems,
} from './getHtmlSnippetFromItems'
import { getHtmlSnippetFromItemsCases } from './getHtmlSnippetFromItems.case'

/**
 * @Description Test to challenge function getHtmlSnippetFromItems
 * @test pnpm jest getHtmlSnippetFromItems.test.ts --coverage --collectCoverageFrom="src/sharedNode/getHtmlSnippetFromItems/getHtmlSnippetFromItems.ts"
 */
describe('getHtmlSnippetFromItems', () => {
  it.each(getHtmlSnippetFromItemsCases)(
    '$index $description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetHtmlSnippetFromItemsCaseType) => {
      let getWithDate = getHtmlSnippetFromItems
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getHtmlSnippetFromItems> = await (
        getWithDate as typeof getHtmlSnippetFromItems
      )(params, options)
      consoler('getHtmlSnippetFromItems.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
