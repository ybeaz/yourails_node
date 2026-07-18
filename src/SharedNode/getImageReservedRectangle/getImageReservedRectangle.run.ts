import { join } from 'node:path'
import { getDateString } from 'yourails_common'
import { consoler } from '../consoler'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import { getSavedBase64ToFile } from '../getSavedBase64ToFile'
import { getImageEdgeOffset } from './getImageEdgeOffset'
import {
  type GetImageReservedRectangleCaseType,
  getImageReservedRectangle,
} from './getImageReservedRectangle'
import { getImageReservedRectangleCases } from './getImageReservedRectangle.case'

/**
 * @run npx tsx src/SharedNode/getImageReservedRectangle/getImageReservedRectangle.run.ts
 */
if (require.main === module) {
  ;(async () => {
    const promises = getImageReservedRectangleCases.map(
      async (
        { description, params, options, expected }: GetImageReservedRectangleCaseType,
        index: number,
      ) => {
        ;(options || {}).margin = getImageEdgeOffset({
          positionInRectangle: 'BOTTOM_RIGHT',
          offset: 36,
        })

        const output = await getRunWithSpinner(getImageReservedRectangle, 'Processing... ')(
          params,
          options,
        )

        const dateString = getDateString({
          timestamp: new Date(),
          dash: true,
          hours: true,
          minutes: true,
          seconds: true,
          isUtcMethods: false,
        })

        const pathFileAbs = join(__dirname, '__output__', `${dateString}_image.png`)
        await getSavedBase64ToFile({
          imageBase64: output,
          pathFileAbs,
        })

        consoler(`getImageReservedRectangle [90-${index}]`, {
          description,
          params,
          pathFileAbs,
          // output,
          // expected,
          // tested: JSON.stringify(output) === JSON.stringify(expected),
        })
      },
    )

    await Promise.all(promises)
  })()
}
