import { consoler } from '../consoler'
import {
  type GetVideoInfoCaseType,
  type GetVideoInfoOptionsType,
  type GetVideoInfoParamsType,
  getVideoInfo,
} from './getVideoInfo'
import { getVideoInfoCases } from './getVideoInfo.case'

/**
 * @run npx tsx src/sharedNode/getVideoInfo/getVideoInfo.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const {
      index,
      description,
      params: getVideoInfoParams,
      options: getVideoInfoOptions,
      expected: _,
    } of getVideoInfoCases) {
      const CASE_TO_PICK_UP = 0

      if (index !== CASE_TO_PICK_UP) continue

      const output = await getVideoInfo(getVideoInfoParams, getVideoInfoOptions)

      consoler(`getVideoInfo [30-${index}]`, {
        index,
        description,
        getVideoInfoParams,
        getVideoInfoOptions,
        output,
      })
    }
  })()
}
