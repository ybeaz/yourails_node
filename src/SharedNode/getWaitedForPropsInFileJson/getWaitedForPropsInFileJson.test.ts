import { describe, expect, it } from '@jest/globals'
import { FileTypeEnum, getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { getReadFile2 } from '../getReadFile2/getReadFile2'
import {
  GetWaitedForPropsInFileJsonCaseType,
  getWaitedForPropsInFileJson,
} from './getWaitedForPropsInFileJson'
import { getWaitedForPropsInFileJsonCases } from './getWaitedForPropsInFileJson.case'

/**
 * @Description Test to challenge function getWaitedForPropsInFileJson
 * @test pnpm jest getWaitedForPropsInFileJson.test.ts --coverage --collectCoverageFrom="src/SharedNode/getWaitedForPropsInFileJson/getWaitedForPropsInFileJson.ts"
 *    In debugging mode:
 *       node --inspect-brk getWaitedForPropsInFileJson.test.ts
 *       chrome://inspect/#devices > Open dedicated DevTools for Node
 */
describe('getWaitedForPropsInFileJson', () => {
  it.each(getWaitedForPropsInFileJsonCases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected: expectedIn,
  }: GetWaitedForPropsInFileJsonCaseType) => {
    let getWithDate = getWaitedForPropsInFileJson
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = await (await withAssignedDate(paramsWithAssignedDate))(getWithDate)

    const output: ReturnType<typeof getWaitedForPropsInFileJson> = await (
      getWithDate as typeof getWaitedForPropsInFileJson
    )(params, options)
    consoler('getWaitedForPropsInFileJson.test', { description, params, output })

    const pathFileAbs = typeof expectedIn === 'string' ? expectedIn : ''

    const expected = await getReadFile2({ pathFileAbs }, { typeFile: FileTypeEnum.json })

    await expect(output).toEqual(expected)
  })
})
