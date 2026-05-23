import { getRunWithSpinner } from '../getRunWithSpinner'
import { type GetImageInfoCaseType, getImageInfo } from './getImageInfo'

/**
 * @run npx tsx src/SharedNode/getImageInfo/getImageInfo.run.ts
 */
if (require.main === module) {
  ;(async () => {
    const getImageInfoCases = await import('./getImageInfo.case').then((m) => m.getImageInfoCases)

    const promises = getImageInfoCases.map(
      async ({ description, params, options, expected }: GetImageInfoCaseType, index: number) => {
        const output = await getRunWithSpinner(getImageInfo, 'Processing... ')(params, options)

        console.log(`getImageInfo [90-${index}]`, {
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
