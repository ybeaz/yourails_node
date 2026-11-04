import { consoler } from '../../sharedNode/consoler'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import {
  type GetDirFilesListedCaseType,
  type GetDirFilesListedOptionsType,
  type GetDirFilesListedParamsType,
  getDirFilesListed,
} from './getDirFilesListed'
import { getDirFilesListedCases } from './getDirFilesListed.case'

/**
 * @run npx tsx src/Shared/getDirFilesListed.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const {
      index,
      description,
      params: getDirFilesListedParams,
      options: getDirFilesListedOptions,
      expected: _,
    } of getDirFilesListedCases) {
      const CASE_TO_PICK_UP = 0

      if (index !== CASE_TO_PICK_UP) continue

      const output = await getDirFilesListed(getDirFilesListedParams, getDirFilesListedOptions)

      consoler(`getDirFilesListed [30-${index}]`, {
        index,
        description,
        getDirFilesListedParams,
        getDirFilesListedOptions,
        output,
      })
    }
  })()
}
