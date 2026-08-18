import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import {
  GetImageNormalizedTestType,
  getImageNormalized,
  getImageNormalizedTests,
} from './getImageNormalized'

/**
 * @Description Test to challenge function getImageNormalized
 * @test pnpm jest getImageNormalized.test.ts --coverage --collectCoverageFrom="src/Shared/getImageNormalized.ts"
 *    In debugging mode:
 *       node --inspect-brk getImageNormalized.test.ts
 *       chrome://inspect/#devices > Open dedicated DevTools for Node
 */
describe('getImageNormalized', () => {
  it.each(getImageNormalizedTests)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetImageNormalizedTestType) => {
    let getWithDate = getImageNormalized
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = await (await withAssignedDate(paramsWithAssignedDate))(getWithDate)

    let output: ReturnType<typeof getImageNormalized> = await (
      getWithDate as typeof getImageNormalized
    )(params, options)
    consoler('getImageNormalized.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
