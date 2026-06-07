import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import {
  GetWaitedForFileResType,
  GetWaitedForFileTestType,
  getWaitedForFile,
} from './getWaitedForFile'
import { getWaitedForFileCases } from './getWaitedForFile.case'

/**
 * @Description Test to challenge function getWaitedForFile
 * @test pnpm jest getWaitedForFile.test.ts --coverage --collectCoverageFrom="src/SharedNode/getWaitedForFile/getWaitedForFile.ts"
 *    In debugging mode:
 *       node --inspect-brk getWaitedForFile.test.ts
 *       chrome://inspect/#devices > Open dedicated DevTools for Node
 */
describe('getWaitedForFile', () => {
  it.each(getWaitedForFileCases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetWaitedForFileTestType) => {
    let getWithDate = getWaitedForFile
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = await (await withAssignedDate(paramsWithAssignedDate))(getWithDate)

    const output: any = await (getWithDate as typeof getWaitedForFile)(params, options)
    consoler('getWaitedForFile.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
