import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { type GetImageColorCenterCaseType, getImageColorCenter } from './getImageColorCenter'
import { getImageColorCenterCases } from './getImageColorCenter.case'

/**
 * @Description Test to challenge function getImageColorCenter
 * @test pnpm jest getImageColorCenter.test.ts --coverage --collectCoverageFrom="src/SharedNode/getImageColorCenter/getImageColorCenter.ts"
 */
describe('getImageColorCenter', () => {
  it.each(getImageColorCenterCases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetImageColorCenterCaseType) => {
    let getWithDate = getImageColorCenter
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

    const output: ReturnType<typeof getImageColorCenter> = await (
      getWithDate as typeof getImageColorCenter
    )(params, options)
    consoler('getImageColorCenter.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
