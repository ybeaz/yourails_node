import {
  type GetWrittenToFileWrapper2CaseType,
  type GetWrittenToFileWrapper2OptionsType,
  type GetWrittenToFileWrapper2ParamsType,
  getWrittenToFileWrapper2,
} from './getWrittenToFileWrapper2'
import { getWrittenToFileWrapper2Cases } from './getWrittenToFileWrapper2.case'

/**
 * @run npx tsx src/SharedNode/getWrittenToFileWrapper2/getWrittenToFileWrapper2.run.ts
 */
if (require.main === module) {
  void (async () => {
    const promises = getWrittenToFileWrapper2Cases.map(
      async (
        { description, params, options, expected }: GetWrittenToFileWrapper2CaseType,
        index: number,
      ) => {
        const output = await getWrittenToFileWrapper2(params, options)

        console.log(`getWrittenToFileWrapper2 [90-${index}]`, {
          description,
          params,
          output,
        })
      },
    )

    await Promise.all(promises)
  })()
}
