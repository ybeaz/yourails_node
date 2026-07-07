// @ts-nocheck
import {
  type GetValidatedEntityLinksFilesReadableCaseType,
  type GetValidatedEntityLinksFilesReadableOptionsType,
  type GetValidatedEntityLinksFilesReadableParamsType,
  getValidatedEntityLinksFilesReadable,
} from './getValidatedEntityLinksFilesReadable'

/**
 * @run npx tsx src/Shared/getValidatedEntityLinksFilesReadable.run.ts
 */
if (require.main === module) {
  void (async () => {
    const getValidatedEntityLinksFilesReadableCases = await import(
      './getValidatedEntityLinksFilesReadable.case'
    ).then((m) => m.getValidatedEntityLinksFilesReadableCases)

    const promises = getValidatedEntityLinksFilesReadableCases.map(
      async (
        { description, params, options, expected }: GetValidatedEntityLinksFilesReadableCaseType,
        index: number,
      ) => {
        const output = await getValidatedEntityLinksFilesReadable(params, options)

        console.log(`getValidatedEntityLinksFilesReadable [90-${index}]`, {
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
