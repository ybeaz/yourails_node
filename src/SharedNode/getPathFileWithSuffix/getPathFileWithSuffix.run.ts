import { consoler } from 'yourails_node/consoler'
import {
  type GetPathFileWithSuffixCaseType,
  type GetPathFileWithSuffixOptionsType,
  type GetPathFileWithSuffixParamsType,
  getPathFileWithSuffix,
} from './getPathFileWithSuffix'
import { getPathFileWithSuffixCases } from './getPathFileWithSuffix.case'

/**
 * @run npx tsx src/Shared/getPathFileWithSuffix.run.ts
 */
if (require.main === module) {
  void (async () => {
    const promises = getPathFileWithSuffixCases.map(
      async (
        { description, params, options, expected }: GetPathFileWithSuffixCaseType,
        index: number,
      ) => {
        const output = await getPathFileWithSuffix(params, options)

        consoler(`getPathFileWithSuffix [90-${index}]`, {
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
