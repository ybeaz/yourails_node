import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { type GetImageColorsCaseType, getImageColors } from './getImageColors'
import { getImageColorsCases } from './getImageColors.case'

/**
 * @Description Test to challenge function getImageColors
 * @test pnpm jest getImageColors.test.ts --coverage --collectCoverageFrom="src/SharedNode/getImageColors/getImageColors.ts"
 */
describe('getImageColors', () => {
  it.each(getImageColorsCases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetImageColorsCaseType) => {
    let getWithDate = getImageColors
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

    const output: ReturnType<typeof getImageColors> = await (getWithDate as typeof getImageColors)(
      params,
      options,
    )
    consoler('getImageColors.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
