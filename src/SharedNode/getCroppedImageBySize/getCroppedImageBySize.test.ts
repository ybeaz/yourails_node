import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { type GetCroppedImageBySizeCaseType, getCroppedImageBySize } from './getCroppedImageBySize'
import { getCroppedImageBySizeCases } from './getCroppedImageBySize.case'

/**
 * @Description Test to challenge function getCroppedImageBySize
 * @test pnpm jest getCroppedImageBySize.test.ts --coverage --collectCoverageFrom="src/Shared/getCroppedImageBySize.ts"
 */
describe('getCroppedImageBySize', () => {
  it.each(getCroppedImageBySizeCases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetCroppedImageBySizeCaseType) => {
    let getWithDate = getCroppedImageBySize
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

    const output: ReturnType<typeof getCroppedImageBySize> = await (
      getWithDate as typeof getCroppedImageBySize
    )(params, options)
    consoler('getCroppedImageBySize.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
