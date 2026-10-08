import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { GetWrittenFile3CaseType, getWrittenFile3 } from './getWrittenFile3'
import { getWrittenFile3Cases } from './getWrittenFile3.case'

/**
 * @Description Test to challenge function getWrittenFile3
 * @test pnpm jest getWrittenFile3.test.ts --coverage --collectCoverageFrom="src/Shared/getWrittenFile3.ts"
 */
describe('Algoritms', () => {
  it.each(getWrittenFile3Cases)(
    '$description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetWrittenFile3CaseType) => {
      let getWithDate = getWrittenFile3
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = await (await withAssignedDate(paramsWithAssignedDate))(getWithDate)

      const output: ReturnType<typeof getWrittenFile3> = await (
        getWithDate as typeof getWrittenFile3
      )(params, options)
      consoler('getWrittenFile3.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
