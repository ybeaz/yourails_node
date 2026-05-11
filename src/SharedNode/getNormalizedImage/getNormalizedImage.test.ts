import { expect, describe, it } from '@jest/globals'
import { consoler } from './consoler'
import { getDateWithTime } from 'yourails_common'
import { withAssignedDate } from 'yourails_common'

import { getNormalizedImage } from './getNormalizedImage'
import { getNormalizedImageTests } from './getNormalizedImage'
import { GetNormalizedImageTestType } from './getNormalizedImage'

/**
 * @Description Test to challenge function getNormalizedImage
 * @test pnpm jest getNormalizedImage.test.ts --coverage --collectCoverageFrom="src/Shared/getNormalizedImage.ts"
 *    In debugging mode:
 *       node --inspect-brk getNormalizedImage.test.ts
 *       chrome://inspect/#devices > Open dedicated DevTools for Node
 */
describe('getNormalizedImage', () => {
  it.each(getNormalizedImageTests)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetNormalizedImageTestType) => {
    let getWithDate: ReturnType<typeof withAssignedDate> = getNormalizedImage
    if (paramsWithAssignedDate && paramsWithAssignedDate.timestamp)
      getWithDate = await (await withAssignedDate(paramsWithAssignedDate))(getWithDate)

    let output: ReturnType<typeof getNormalizedImage> = await (
      getWithDate as typeof getNormalizedImage
    )(params, options)
    consoler('getNormalizedImage.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
