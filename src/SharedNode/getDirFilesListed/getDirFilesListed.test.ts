import { describe, expect, it } from '@jest/globals'

import { withAssignedDate } from 'yourails_common'

import { consoler } from '../../sharedNode/consoler'
import { type GetDirFilesListedCaseType, getDirFilesListed } from './getDirFilesListed'
import { getDirFilesListedCases } from './getDirFilesListed.case'

/**
 * @Description Test to challenge function getDirFilesListed
 * @test pnpm jest getDirFilesListed.test.ts --coverage --collectCoverageFrom="src/Shared/getDirFilesListed.ts"
 */
describe('getDirFilesListed', () => {
  it.each(getDirFilesListedCases)(
    '$index $description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetDirFilesListedCaseType) => {
      let getWithDate = getDirFilesListed
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getDirFilesListed> = await (
        getWithDate as typeof getDirFilesListed
      )(params, options)
      consoler('getDirFilesListed.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
