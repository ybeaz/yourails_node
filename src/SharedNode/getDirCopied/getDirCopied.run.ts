import { consoler } from '../../sharedNode/consoler'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import {
  type GetDirCopiedCaseType,
  type GetDirCopiedOptionsType,
  type GetDirCopiedParamsType,
  getDirCopied,
} from './getDirCopied'
import { getDirCopiedCases } from './getDirCopied.case'

/**
 * @run npx tsx src/Shared/getDirCopied.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const {
      index,
      description,
      params: getDirCopiedParams,
      options: getDirCopiedOptions,
      expected: _,
    } of getDirCopiedCases) {
      const CASE_TO_PICK_UP = 0

      if (index !== CASE_TO_PICK_UP) continue

      const output = await getDirCopied(getDirCopiedParams, getDirCopiedOptions)

      consoler(`getDirCopied [30-${index}]`, {
        index,
        description,
        getDirCopiedParams,
        getDirCopiedOptions,
        output,
      })
    }
  })()
}
