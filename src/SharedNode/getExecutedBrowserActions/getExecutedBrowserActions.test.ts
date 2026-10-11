import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'
import { consoler } from '../../sharedNode/consoler'
import {
  type GetExecutedBrowserActionsCaseType,
  getExecutedBrowserActions,
} from './getExecutedBrowserActions'
import { getExecutedBrowserActionsCases } from './getExecutedBrowserActions.case'

/**
 * @Description Test to challenge function getExecutedBrowserActions
 * @test pnpm jest getExecutedBrowserActions.test.ts --coverage --collectCoverageFrom="src/Shared/getExecutedBrowserActions.ts"
 */
describe('getExecutedBrowserActions', () => {
  it.each(getExecutedBrowserActionsCases)(
    '$index $description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetExecutedBrowserActionsCaseType) => {
      let getWithDate = getExecutedBrowserActions
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getExecutedBrowserActions> = await (
        getWithDate as typeof getExecutedBrowserActions
      )(params, options)
      consoler('getExecutedBrowserActions.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
