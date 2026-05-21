import { consoler } from '../consoler'
import { type GetImageColorCenterCaseType, getImageColorCenter } from './getImageColorCenter'

/**
 * @run npx tsx src/SharedNode/getImageColorCenter/getImageColorCenter.run.ts
 * @test pnpm jest getImageColorCenter.test.ts --coverage --collectCoverageFrom="src/SharedNode/getImageColorCenter/getImageColorCenter.ts"
 */
if (require.main === module) {
  ;(async () => {
    const getImageColorCenterCases = await import('./getImageColorCenter.case').then(
      (m) => m.getImageColorCenterCases,
    )

    const promises = getImageColorCenterCases.map(
      async (
        { description, params, options, expected }: GetImageColorCenterCaseType,
        index: number,
      ) => {
        const output = await getImageColorCenter(params, options)

        consoler(`getImageColorCenter [90-${index}]`, {
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
