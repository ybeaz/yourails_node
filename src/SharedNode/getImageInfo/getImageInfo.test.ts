import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { type GetImageInfoCaseType, getImageInfo } from './getImageInfo'
import { getImageInfoCases } from './getImageInfo.case'

/**
 * @Description Test to challenge function getImageInfo
 * @test pnpm jest getImageInfo.test.ts --coverage --collectCoverageFrom="src/SharedNode/getImageInfo/getImageInfo.ts"
 */
describe('getImageInfo', () => {
  it.each(getImageInfoCases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetImageInfoCaseType) => {
    let getWithDate = getImageInfo
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

    const output: ReturnType<typeof getImageInfo> = await (getWithDate as typeof getImageInfo)(
      params,
      options,
    )
    consoler('getImageInfo.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
