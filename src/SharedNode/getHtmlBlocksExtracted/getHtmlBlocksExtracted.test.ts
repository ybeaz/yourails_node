import { describe, expect, it } from '@jest/globals'
import { consoler } from '../../sharedNode/consoler'
import { withAssignedDate } from '../withAssignedDate'
import {
  type GetHtmlBlocksExtractedCaseType,
  getHtmlBlocksExtracted,
} from './getHtmlBlocksExtracted'
import { getHtmlBlocksExtractedCases } from './getHtmlBlocksExtracted.case'

/**
 * @Description Test to challenge function getHtmlBlocksExtracted
 * @test pnpm jest getHtmlBlocksExtracted.test.ts --coverage --collectCoverageFrom="src/shared/getHtmlBlocksExtracted/getHtmlBlocksExtracted.ts"
 */
describe('getHtmlBlocksExtracted', () => {
  it.each(getHtmlBlocksExtractedCases)('$index $description', async ({
    index,
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetHtmlBlocksExtractedCaseType) => {
    let getWithDate = getHtmlBlocksExtracted
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

    const output: ReturnType<typeof getHtmlBlocksExtracted> = await (
      getWithDate as typeof getHtmlBlocksExtracted
    )(params, options)
    consoler('getHtmlBlocksExtracted.test', { index, description, params, output })

    expect(output).toEqual(expected)
  })
})
