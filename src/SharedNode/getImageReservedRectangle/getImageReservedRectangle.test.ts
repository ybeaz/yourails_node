import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import {
  type GetImageReservedRectangleCaseType,
  getImageReservedRectangle,
} from './getImageReservedRectangle'
import { getImageReservedRectangleCases } from './getImageReservedRectangle.case'

/**
 * @Description Test to challenge function getImageReservedRectangle
 * @test pnpm jest getImageReservedRectangle.test.ts --coverage --collectCoverageFrom="src/Shared/getImageReservedRectangle.ts"
 */
describe('getImageReservedRectangle', () => {
  it.each(getImageReservedRectangleCases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetImageReservedRectangleCaseType) => {
    let getWithDate = getImageReservedRectangle
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

    const output: ReturnType<typeof getImageReservedRectangle> = await (
      getWithDate as typeof getImageReservedRectangle
    )(params, options)
    consoler('getImageReservedRectangle.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
