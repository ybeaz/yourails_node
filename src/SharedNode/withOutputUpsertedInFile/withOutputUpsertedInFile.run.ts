import { consoler } from '../../sharedNode/consoler'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import {
  type WithOutputUpsertedInFileParamsType,
  withOutputUpsertedInFile,
} from './withOutputUpsertedInFile'
import { withOutputUpsertedInFileCases } from './withOutputUpsertedInFile.case'

/**
 * @run npx tsx src/sharedNode/withOutputUpsertedInFile/withOutputUpsertedInFile.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const {
      index,
      description,
      params: withOutputUpsertedInFileParams,
      func,
      expected: _,
    } of withOutputUpsertedInFileCases) {
      const CASE_TO_PICK_UP = 0

      if (index !== CASE_TO_PICK_UP) continue

      consoler('withOutputUpsertedInFile.run [26]', {
        withOutputUpsertedInFileParams,
        func,
      })

      const output = await getRunWithSpinner(
        withOutputUpsertedInFile(withOutputUpsertedInFileParams)(func),
      )({})

      consoler(`withOutputUpsertedInFile [30-${index}]`, {
        index,
        description,
        withOutputUpsertedInFileParams,
        output,
      })
    }
  })()
}
