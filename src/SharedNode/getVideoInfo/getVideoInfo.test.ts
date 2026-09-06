import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'
import { consoler } from 'yourails_node/consoler'
import { type GetVideoInfoCaseType, getVideoInfo } from './getVideoInfo'
import { getVideoInfoCases } from './getVideoInfo.case'

/**
 * @Description Test to challenge function getVideoInfo
 * @test pnpm jest getVideoInfo.test.ts --coverage --collectCoverageFrom="src/SharedNode/getVideoInfo/getVideoInfo.ts"
 */
describe('getVideoInfo', () => {
  it.each(getVideoInfoCases)(
    '$description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetVideoInfoCaseType) => {
      let getWithDate = getVideoInfo
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getVideoInfo> = await (getWithDate as typeof getVideoInfo)(
        params,
        options,
      )
      consoler('getVideoInfo.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
