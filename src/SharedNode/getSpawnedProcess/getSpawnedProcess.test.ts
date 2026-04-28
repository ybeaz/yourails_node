import { expect, describe, it } from '@jest/globals'
import { consoler } from 'yourails_common'
import { getDateWithTime } from 'yourails_common'
import { withAssignedDate } from 'yourails_common'

import { getSpawnedProcess } from './getSpawnedProcess'
import { getSpawnedProcessTests } from './getSpawnedProcess'
import { GetSpawnedProcessTestType } from './getSpawnedProcess'

/**
 * @Description Test to challenge function getSpawnedProcess
 * @test pnpm jest getSpawnedProcess.test.ts --coverage --collectCoverageFrom="src/Shared/getSpawnedProcess.ts"
 *    In debugging mode:
 *       node --inspect-brk getSpawnedProcess.test.ts
 *       chrome://inspect/#devices > Open dedicated DevTools for Node
 */
describe('getSpawnedProcess', () => {
  it.each(getSpawnedProcessTests)(
    '$description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetSpawnedProcessTestType) => {
      let getWithDate: ReturnType<typeof withAssignedDate> = getSpawnedProcess
      if (paramsWithAssignedDate && paramsWithAssignedDate.timestamp)
        getWithDate = await (await withAssignedDate(paramsWithAssignedDate))(getWithDate)

      let output: ReturnType<typeof getSpawnedProcess> = await (
        getWithDate as typeof getSpawnedProcess
      )(params, options)
      consoler('getSpawnedProcess.test', { description, params, output })

      expect(output).toEqual(expected)
    }
  )
})
