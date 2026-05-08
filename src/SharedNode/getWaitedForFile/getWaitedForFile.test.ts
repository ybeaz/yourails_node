// @ts-nocheck

import { expect, describe, it } from '@jest/globals'
import { consoler } from 'yourails_common'
import { getDateWithTime } from 'yourails_common'
import { withAssignedDate } from 'yourails_common'

import { getWaitedForFile } from './getWaitedForFile'
import { GetWaitedForFileTestType } from './getWaitedForFile'
import { getWaitedForFileCases } from './getWaitedForFile.case'

/**
 * @Description Test to challenge function getWaitedForFile
 * @test pnpm jest getWaitedForFile.test.ts --coverage --collectCoverageFrom="src/Shared/getWaitedForFile.ts"
 *    In debugging mode:
 *       node --inspect-brk getWaitedForFile.test.ts
 *       chrome://inspect/#devices > Open dedicated DevTools for Node
 */
describe('getWaitedForFile', () => {
  it.each(getWaitedForFileCases)(
    '$description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetWaitedForFileTestType) => {
      let getWithDate: ReturnType<typeof withAssignedDate> = getWaitedForFile
      if (paramsWithAssignedDate && paramsWithAssignedDate.timestamp)
        getWithDate = await (await withAssignedDate(paramsWithAssignedDate))(getWithDate)

      let output: ReturnType<typeof getWaitedForFile> = await (
        getWithDate as typeof getWaitedForFile
      )(params, options)
      consoler('getWaitedForFile.test', { description, params, output })

      expect(output).toEqual(expected)
    }
  )
})
