import { join } from 'node:path'
import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { getWrittenFile2 } from '../getWrittenFile2/getWrittenFile2'
import { GetImageFromHtmlCaseType, getImageFromHtml } from './getImageFromHtml'
import { getImageFromHtmlCases } from './getImageFromHtml.case'

/**
 * @Description Test to challenge function getImageFromHtml
 * @test pnpm jest getImageFromHtml.test.ts --coverage --collectCoverageFrom="src/SharedNode/getImageFromHtml/getImageFromHtml.ts"
 *    In debugging mode:
 *       node --inspect-brk getImageFromHtml.test.ts
 *       chrome://inspect/#devices > Open dedicated DevTools for Node
 */
describe('getImageFromHtml', () => {
  it.each(getImageFromHtmlCases)('$description', async ({
    description,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetImageFromHtmlCaseType) => {
    let getWithDate = getImageFromHtml
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = await (await withAssignedDate(paramsWithAssignedDate))(getWithDate)

    const output: ReturnType<typeof getImageFromHtml> = await (
      getWithDate as typeof getImageFromHtml
    )(params, options)

    const pathFileAbs = join(__dirname, '__output__', 'xxx.json')

    await getWrittenFile2({
      pathFileAbs,
      data: {
        imageBase64: output,
      },
    })

    consoler('getImageFromHtml.test', { description, params, output })

    expect(output).toEqual(expected)
  })
})
