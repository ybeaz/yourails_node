import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { GetReadFile2TestType, getReadFile2, getReadFile2Tests } from './getReadFile2'

/**
 * @Description Test to challenge function getReadFile2
 * @test pnpm jest getReadFile2.test.ts --coverage --collectCoverageFrom="src/Shared/getReadFile2.ts"
 *    In debugging mode:
 *       node --inspect-brk getReadFile2.test.ts
 *       chrome://inspect/#devices > Open dedicated DevTools for Node
 */
describe('Algoritms', () => {
  it.each(getReadFile2Tests)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetReadFile2TestType) => {
    let getWithDate = getReadFile2
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = await (await withAssignedDate(paramsWithAssignedDate))(getWithDate)

    const output: ReturnType<typeof getReadFile2> = (await (getWithDate as typeof getReadFile2)(
      params,
      options,
    )) as ReturnType<typeof getReadFile2>
    consoler('getReadFile2.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
