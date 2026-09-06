// @ts-nocheck
import { consoler } from 'yourails_node/consoler'
import {
  type GetCompressedImagePngCaseType,
  type GetCompressedImagePngOptionsType,
  type GetCompressedImagePngParamsType,
  getCompressedImagePng,
} from './getCompressedImagePng'
import { getCompressedImagePngCases } from './getCompressedImagePng.case'

/**
 * @run npx tsx src/Shared/getCompressedImagePng.run.ts
 */
if (require.main === module) {
  void (async () => {
    const promises = getCompressedImagePngCases.map(
      async (
        { description, params, options, expected }: GetCompressedImagePngCaseType,
        index: number,
      ) => {
        const output = await getCompressedImagePng(params, options)

        consoler(`getCompressedImagePng [90-${index}]`, {
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
