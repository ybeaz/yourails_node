import { consoler } from '../consoler'
import { type GetCroppedImageBySizeCaseType, getCroppedImageBySize } from './getCroppedImageBySize'

/**
 * @run npx tsx src/SharedNode/getCroppedImageBySize/getCroppedImageBySize.run.ts
 * @test pnpm jest getCroppedImageBySize.test.ts --coverage --collectCoverageFrom="src/Shared/getCroppedImageBySize.ts"
 */
if (require.main === module) {
  ;(async () => {
    const getCroppedImageBySizeCases = await import('./getCroppedImageBySize.case').then(
      (m) => m.getCroppedImageBySizeCases,
    )

    const promises = getCroppedImageBySizeCases.map(
      async (
        { description, params, options, expected }: GetCroppedImageBySizeCaseType,
        index: number,
      ) => {
        const output = await getCroppedImageBySize(params, options)

        consoler(`getCroppedImageBySize [90-${index}]`, {
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
