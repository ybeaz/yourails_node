// @ts-nocheck

import { expect, describe, it } from '@jest/globals'
import { consoler } from './consoler'
import { getDateWithTime } from 'yourails_common'
import { withAssignedDate } from 'yourails_common'

import { getWrittenFile2 } from './getWrittenFile2'
import { getWrittenFile2Tests } from './getWrittenFile2'
import { GetWrittenFile2TestType } from './getWrittenFile2'

/**
 * @Description Test to challenge function getWrittenFile2
 * @test pnpm jest getWrittenFile2.test.ts --coverage --collectCoverageFrom="src/Shared/getWrittenFile2.ts"
 *    In debugging mode:
 *       node --inspect-brk getWrittenFile2.test.ts
 *       chrome://inspect/#devices > Open dedicated DevTools for Node
 */
describe('Algoritms', () => {
  it.each(getWrittenFile2Tests)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetWrittenFile2TestType) => {
    let getWithDate: ReturnType<typeof withAssignedDate> = getWrittenFile2
    if (paramsWithAssignedDate && paramsWithAssignedDate.timestamp)
      getWithDate = await (await withAssignedDate(paramsWithAssignedDate))(getWithDate)

    let output: ReturnType<typeof getWrittenFile2> = await (getWithDate as typeof getWrittenFile2)(
      params,
      options,
    )
    consoler('getWrittenFile2.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
