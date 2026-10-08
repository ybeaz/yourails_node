// @ts-nocheck

// import { consoler } from 'yourails_node'
import { getRunWithSpinner } from 'yourails_node'
import { consoler } from '../../sharedNode/consoler'
import {
  type GetGemsCaseType,
  type GetGemsOptionsType,
  type GetGemsParamsType,
  getGems,
} from './getGems'
import { getGemsCases } from './getGems.case'

/**
 * @run npx tsx src/Shared/getGems.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const {
      index,
      description,
      params: getGemsParams,
      options: getGemsOptions,
      expected: _,
    } of getGemsCases) {
      const CASE_TO_PICK_UP = 0

      if (index !== CASE_TO_PICK_UP) continue

      const output = await getGems(getGemsParams, getGemsOptions)

      consoler(`getGems [30-${index}]`, {
        index,
        description,
        getGemsParams,
        getGemsOptions,
        output,
      })
    }
  })()
}
