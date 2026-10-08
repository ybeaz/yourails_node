import { consoler } from '../consoler'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import { type GetImageColorsCaseType, getImageColors } from './getImageColors'
import { getImageColorsCases } from './getImageColors.case'

/**
 * @run npx tsx src/sharedNode/getImageColors/getImageColors.run.ts
 * @test pnpm jest getImageColors.test.ts --coverage --collectCoverageFrom="src/sharedNode/getImageColors/getImageColors.ts"
 */
if (require.main === module) {
  ;(async () => {
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
