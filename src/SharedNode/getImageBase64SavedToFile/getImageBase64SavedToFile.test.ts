import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import {
  type GetImageBase64SavedToFileCaseType,
  getImageBase64SavedToFile,
} from './getImageBase64SavedToFile'
import { getImageBase64SavedToFileCases } from './getImageBase64SavedToFile.case'

/**
 * @Description Test to challenge function getImageBase64SavedToFile
 * @test pnpm jest getImageBase64SavedToFile.test.ts --coverage --collectCoverageFrom="src/Shared/getImageBase64SavedToFile.ts"
 */
describe('getImageBase64SavedToFile', () => {
  it.each(getImageBase64SavedToFileCases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetImageBase64SavedToFileCaseType) => {
    let getWithDate = getImageBase64SavedToFile
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

    const output: ReturnType<typeof getImageBase64SavedToFile> = await (
      getWithDate as typeof getImageBase64SavedToFile
    )(params, options)
    consoler('getImageBase64SavedToFile.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
