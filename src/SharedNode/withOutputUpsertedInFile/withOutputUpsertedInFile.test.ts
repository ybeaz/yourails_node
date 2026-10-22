import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'
import { consoler } from '../../sharedNode/consoler'
import {
  type WithOutputUpsertedInFileCaseType,
  withOutputUpsertedInFile,
} from './withOutputUpsertedInFile'
import { withOutputUpsertedInFileCases } from './withOutputUpsertedInFile.case'

/**
 * @Description Test to challenge function withOutputUpsertedInFile
 * @test pnpm jest withOutputUpsertedInFile.test.ts --coverage --collectCoverageFrom="src/Shared/withOutputUpsertedInFile.ts"
 */
describe('withOutputUpsertedInFile', () => {
  it.each(withOutputUpsertedInFileCases)(
    '$index $description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: WithOutputUpsertedInFileCaseType) => {
      let getWithDate = withOutputUpsertedInFile
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

      const output: ReturnType<typeof withOutputUpsertedInFile> = await (
        getWithDate as typeof withOutputUpsertedInFile
      )(params, options)
      consoler('withOutputUpsertedInFile.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
