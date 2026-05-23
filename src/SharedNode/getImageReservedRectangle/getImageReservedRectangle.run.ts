import { getRunWithSpinner } from '../getRunWithSpinner'
import {
  type GetImageReservedRectangleCaseType,
  getImageReservedRectangle,
} from './getImageReservedRectangle'

/**
 * @run npx tsx src/SharedNode/getImageReservedRectangle/getImageReservedRectangle.run.ts
 */
if (require.main === module) {
  ;(async () => {
    const getImageReservedRectangleCases = await import('./getImageReservedRectangle.case').then(
      (m) => m.getImageReservedRectangleCases,
    )

    const promises = getImageReservedRectangleCases.map(
      async (
        { description, params, options, expected }: GetImageReservedRectangleCaseType,
        index: number,
      ) => {
        const output = await getRunWithSpinner(getImageReservedRectangle, 'Processing... ')(
          params,
          options,
        )

        console.log(`getImageReservedRectangle [90-${index}]`, {
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
