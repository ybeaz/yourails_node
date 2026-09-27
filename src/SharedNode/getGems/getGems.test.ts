import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'
import { consoler } from '../../sharedNode/consoler'
import { type GetGemsCaseType, getGems } from './getGems'
import { getGemsCases } from './getGems.case'

/**
 * @Description Test to challenge function getGems
 * @test pnpm jest getGems.test.ts --coverage --collectCoverageFrom="src/Shared/getGems.ts"
 */
describe('getGems', () => {
  it.each(getGemsCases)(
    '$index $description',
    async ({ description, params, options, paramsWithAssignedDate, expected }: GetGemsCaseType) => {
      let getWithDate = getGems
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getGems> = await (getWithDate as typeof getGems)(
        params,
        options,
      )
      consoler('getGems.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
