import { describe, expect, it } from '@jest/globals'
// import { withAssignedDate } from '../withAssignedDate'
import { withAssignedDate } from 'yourails_common'
import { consoler } from 'yourails_node/consoler'
import { type GetPathFileWithSuffixCaseType, getPathFileWithSuffix } from './getPathFileWithSuffix'
import { getPathFileWithSuffixCases } from './getPathFileWithSuffix.case'

/**
 * @Description Test to challenge function getPathFileWithSuffix
 * @test pnpm jest getPathFileWithSuffix.test.ts --coverage --collectCoverageFrom="src/SharedNode/getPathFileWithSuffix/getPathFileWithSuffix.ts"
 */
describe('getPathFileWithSuffix', () => {
  it.each(getPathFileWithSuffixCases)(
    '$description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetPathFileWithSuffixCaseType) => {
      let getWithDate = getPathFileWithSuffix
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getPathFileWithSuffix> = await (
        getWithDate as typeof getPathFileWithSuffix
      )(params, options)
      consoler('getPathFileWithSuffix.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
