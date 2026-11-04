import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'

import { consoler } from '../../sharedNode/consoler'
import { type GetDirCopiedCaseType, getDirCopied } from './getDirCopied'
import { getDirCopiedCases } from './getDirCopied.case'

/**
 * @Description Test to challenge function getDirCopied
 * @test pnpm jest getDirCopied.test.ts --coverage --collectCoverageFrom="src/Shared/getDirCopied.ts"
 */
describe('getDirCopied', () => {
  it.each(getDirCopiedCases)(
    '$index $description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetDirCopiedCaseType) => {
      let getWithDate = getDirCopied
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getDirCopied> = await (getWithDate as typeof getDirCopied)(
        params,
        options,
      )
      consoler('getDirCopied.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
