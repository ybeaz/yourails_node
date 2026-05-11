import { expect, describe, it } from '@jest/globals'
import { consoler } from './consoler'
import { getDateWithTime } from 'yourails_common'
import { withAssignedDate } from 'yourails_common'

import { getReadFile2 } from './getReadFile2'
import { getReadFile2Tests } from './getReadFile2'
import { GetReadFile2TestType } from './getReadFile2'

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
    let getWithDate: ReturnType<typeof withAssignedDate> = getReadFile2
    if (paramsWithAssignedDate && paramsWithAssignedDate.timestamp)
      getWithDate = await (await withAssignedDate(paramsWithAssignedDate))(getWithDate)

    let output: ReturnType<typeof getReadFile2> = await (getWithDate as typeof getReadFile2)(
      params,
      options,
    )
    consoler('getReadFile2.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
