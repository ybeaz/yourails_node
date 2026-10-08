import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'
import { consoler } from '../../sharedNode/consoler'
import {
  type GetHtmlJsonLdExtractedCaseType,
  getHtmlJsonLdExtracted,
} from './getHtmlJsonLdExtracted'
import { getHtmlJsonLdExtractedCases } from './getHtmlJsonLdExtracted.case'

/**
 * @Description Test to challenge function getHtmlJsonLdExtracted
 * @test pnpm jest getHtmlJsonLdExtracted.test.ts --coverage --collectCoverageFrom="src/sharedNode/getHtmlJsonLdExtracted/getHtmlJsonLdExtracted.ts"
 */
describe('getHtmlJsonLdExtracted', () => {
  it.each(getHtmlJsonLdExtractedCases)(
    '$index $description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetHtmlJsonLdExtractedCaseType) => {
      let getWithDate = getHtmlJsonLdExtracted
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getHtmlJsonLdExtracted> = await (
        getWithDate as typeof getHtmlJsonLdExtracted
      )(params, options)
      consoler('getHtmlJsonLdExtracted.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
