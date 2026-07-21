import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'
import { consoler } from 'yourails_node'
import {
  type GetWrittenToFileWrapper2CaseType,
  getWrittenToFileWrapper2,
} from './getWrittenToFileWrapper2'
import { getWrittenToFileWrapper2Cases } from './getWrittenToFileWrapper2.case'

/**
 * @Description Test to challenge function getWrittenToFileWrapper2
 * @test pnpm jest getWrittenToFileWrapper2.test.ts --coverage --collectCoverageFrom="src/Shared/getWrittenToFileWrapper2.ts"
 */
describe('getWrittenToFileWrapper2', () => {
  it.each(getWrittenToFileWrapper2Cases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetWrittenToFileWrapper2CaseType) => {
    let getWithDate = getWrittenToFileWrapper2
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

    const output: ReturnType<typeof getWrittenToFileWrapper2> = await (
      getWithDate as typeof getWrittenToFileWrapper2
    )(params, options)
    consoler('getWrittenToFileWrapper2.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
