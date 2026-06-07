import { consoler } from '../consoler'
import { getRunWithSpinner } from '../getRunWithSpinner'
import { type GetImageCroppedBySizeCaseType, getImageCroppedBySize } from './getImageCroppedBySize'

/**
 * @run npx tsx src/SharedNode/getImageCroppedBySize/getImageCroppedBySize.run.ts
 * @test pnpm jest getImageCroppedBySize.test.ts --coverage --collectCoverageFrom="src/Shared/getImageCroppedBySize.ts"
 */
if (require.main === module) {
  ;(async () => {
    const getImageCroppedBySizeCases = await import('./getImageCroppedBySize.case').then(
      (m) => m.getImageCroppedBySizeCases,
    )

    const promises = getImageCroppedBySizeCases.map(
      async (
        { description, params, options, expected }: GetImageCroppedBySizeCaseType,
        index: number,
      ) => {
        const output = await getRunWithSpinner(getImageCroppedBySize, 'Processing... ')(
          params,
          options,
        )

        consoler(`getImageCroppedBySize [90-${index}]`, {
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
