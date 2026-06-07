import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { GetWrittenFile2CaseType, getWrittenFile2 } from './getWrittenFile2'
import { getWrittenFile2Cases } from './getWrittenFile2.case'

/**
 * @Description Test to challenge function getWrittenFile2
 * @test pnpm jest getWrittenFile2.test.ts --coverage --collectCoverageFrom="src/Shared/getWrittenFile2.ts"
 */
describe('Algoritms', () => {
  it.each(getWrittenFile2Cases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetWrittenFile2CaseType) => {
    let getWithDate = getWrittenFile2
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = await (await withAssignedDate(paramsWithAssignedDate))(getWithDate)

    const output: ReturnType<typeof getWrittenFile2> = await (
      getWithDate as typeof getWrittenFile2
    )(params, options)
    consoler('getWrittenFile2.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
