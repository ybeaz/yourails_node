import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'
import { consoler } from '../../sharedNode/consoler'
import {
  type GetTemplateFuncWithNameCaseType,
  getTemplateFuncWithName,
} from './getTemplateFuncWithName'
import { getTemplateFuncWithNameCases } from './getTemplateFuncWithName.case'

/**
 * @Description Test to challenge function getTemplateFuncWithName
 * @test pnpm jest getTemplateFuncWithName.test.ts --coverage --collectCoverageFrom="src/Shared/getTemplateFuncWithName.ts"
 */
describe('getTemplateFuncWithName', () => {
  it.each(getTemplateFuncWithNameCases)(
    '$index $description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetTemplateFuncWithNameCaseType) => {
      let getWithDate = getTemplateFuncWithName
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof getTemplateFuncWithName> = await (
        getWithDate as typeof getTemplateFuncWithName
      )(params, options)
      consoler('getTemplateFuncWithName.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
