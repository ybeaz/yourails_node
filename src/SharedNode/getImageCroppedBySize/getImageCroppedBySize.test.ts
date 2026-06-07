import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { type GetImageCroppedBySizeCaseType, getImageCroppedBySize } from './getImageCroppedBySize'
import { getImageCroppedBySizeCases } from './getImageCroppedBySize.case'

/**
 * @Description Test to challenge function getImageCroppedBySize
 * @test pnpm jest getImageCroppedBySize.test.ts --coverage --collectCoverageFrom="src/Shared/getImageCroppedBySize.ts"
 */
describe('getImageCroppedBySize', () => {
  it.each(getImageCroppedBySizeCases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetImageCroppedBySizeCaseType) => {
    let getWithDate = getImageCroppedBySize
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

    const output: ReturnType<typeof getImageCroppedBySize> = await (
      getWithDate as typeof getImageCroppedBySize
    )(params, options)
    consoler('getImageCroppedBySize.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
