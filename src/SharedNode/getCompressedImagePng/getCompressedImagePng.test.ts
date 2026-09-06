// @ts-nocheck
import { describe, expect, it } from '@jest/globals'
// import { withAssignedDate } from '../withAssignedDate'
import { withAssignedDate } from 'yourails_common'
import { consoler } from 'yourails_node/consoler'
import { type GetCompressedImagePngCaseType, getCompressedImagePng } from './getCompressedImagePng'
import { getCompressedImagePngCases } from './getCompressedImagePng.case'

/**
 * @Description Test to challenge function getCompressedImagePng
 * @test pnpm jest getCompressedImagePng.test.ts --coverage --collectCoverageFrom="src/Shared/getCompressedImagePng.ts"
 */
describe('getCompressedImagePng', () => {
  it.each(getCompressedImagePngCases)(
    '$description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetCompressedImagePngCaseType) => {
      let getWithDate = getCompressedImagePng
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getCompressedImagePng> = await (
        getWithDate as typeof getCompressedImagePng
      )(params, options)
      consoler('getCompressedImagePng.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
