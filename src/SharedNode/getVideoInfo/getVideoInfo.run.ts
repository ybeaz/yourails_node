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
    const promises = getVideoInfoCases.map(
      async ({ description, params, options, expected }: GetVideoInfoCaseType, index: number) => {
        const output = await getVideoInfo(params, options)

        consoler(`getVideoInfo [90-${index}]`, {
          description,
          params,
          output,
          expected,
          tested: JSON.stringify(output) === JSON.stringify(expected),
        })
      },
    )

    await Promise.all(promises)
  })()
}
