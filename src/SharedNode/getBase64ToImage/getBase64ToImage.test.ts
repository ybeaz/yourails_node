import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import {
  type GetBase64ToImageCaseType,
  getBase64ToImage,
} from './getBase64ToImage'
import { getBase64ToImageCases } from './getBase64ToImage.case'

/**
 * @Description Test to challenge function getBase64ToImage
 * @test pnpm jest getBase64ToImage.test.ts --coverage --collectCoverageFrom="src/Shared/getBase64ToImage.ts"
 */
describe('getBase64ToImage', () => {
  it.each(getBase64ToImageCases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetBase64ToImageCaseType) => {
    let getWithDate = getBase64ToImage
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

    const output: ReturnType<typeof getBase64ToImage> = await (
      getWithDate as typeof getBase64ToImage
    )(params, options)
    consoler('getBase64ToImage.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
