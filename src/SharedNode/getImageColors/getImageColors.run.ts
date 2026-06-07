import { consoler } from '../consoler'
import { getRunWithSpinner } from '../getRunWithSpinner'
import { type GetImageColorsCaseType, getImageColors } from './getImageColors'

/**
 * @run npx tsx src/SharedNode/getImageColors/getImageColors.run.ts
 * @test pnpm jest getImageColors.test.ts --coverage --collectCoverageFrom="src/SharedNode/getImageColors/getImageColors.ts"
 */
if (require.main === module) {
  ;(async () => {
    const getImageColorsCases = await import('./getImageColors.case').then(
      (m) => m.getImageColorsCases,
    )

    const promises = getImageColorsCases.map(
      async ({ description, params, options, expected }: GetImageColorsCaseType, index: number) => {
        const output = await getRunWithSpinner(getImageColors, 'Processing... ')(params, options)

        consoler(`getImageColors [90-${index}]`, {
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
