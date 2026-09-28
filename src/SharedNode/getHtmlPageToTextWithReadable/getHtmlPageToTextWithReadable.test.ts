import { describe, expect, it } from '@jest/globals'

import { withAssignedDate } from 'yourails_common'
import { consoler } from '../../sharedNode/consoler'
import {
  type GetHtmlPageToTextWithReadableCaseType,
  getHtmlPageToTextWithReadable,
} from './getHtmlPageToTextWithReadable'
import { getHtmlPageToTextWithReadableCases } from './getHtmlPageToTextWithReadable.case'

/**
 * @Description Test to challenge function getHtmlPageToTextWithReadable
 * @test pnpm jest getHtmlPageToTextWithReadable.test.ts --coverage --collectCoverageFrom="src/Shared/getHtmlPageToTextWithReadable.ts"
 */
describe('getHtmlPageToTextWithReadable', () => {
  it.each(getHtmlPageToTextWithReadableCases)(
    '$index $description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetHtmlPageToTextWithReadableCaseType) => {
      let getWithDate = getHtmlPageToTextWithReadable
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getHtmlPageToTextWithReadable> = await (
        getWithDate as typeof getHtmlPageToTextWithReadable
      )(params, options)
      consoler('getHtmlPageToTextWithReadable.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
