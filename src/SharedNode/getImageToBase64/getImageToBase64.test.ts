import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { type GetImageToBase64CaseType, getImageToBase64 } from './getImageToBase64'
import { getImageToBase64Cases } from './getImageToBase64.case'

/**
 * @Description Test to challenge function getImageToBase64
 * @test pnpm jest getImageToBase64.test.ts --coverage --collectCoverageFrom="src/SharedNode/getImageToBase64/getImageToBase64.ts"
 */
describe('getImageToBase64', () => {
  it.each(getImageToBase64Cases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetImageToBase64CaseType) => {
    let getWithDate = getImageToBase64
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

    const output: ReturnType<typeof getImageToBase64> = await (
      getWithDate as typeof getImageToBase64
    )(params, options)
    consoler('getImageToBase64.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
