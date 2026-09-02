import { join } from 'node:path'
import { getDateString } from 'yourails_common'
import { consoler } from '../consoler'
import { getReadFile2 } from '../getReadFile2/getReadFile2'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import {
  type GetBase64ToImageCaseType,
  getBase64ToImage,
} from './getBase64ToImage'
import { getBase64ToImageCases } from './getBase64ToImage.case'

/**
 * @run npx tsx src/SharedNode/getBase64ToImage/getBase64ToImage.run.ts
 */
if (require.main === module) {
  ; (async () => {
    const promises = getBase64ToImageCases.map(
      async (
        { description, params, options, expected }: GetBase64ToImageCaseType,
        index: number,
      ) => {
        const imageBase64: string = (await getReadFile2({
          pathFileAbs: join(__dirname, '__mocks__', 's_5_2026-05-29-08-51-31_imageRaw.txt'),
        })) as string
        params.imageBase64 = imageBase64

        const dateString = getDateString({
          timestamp: new Date(),
          dash: true,
          hours: true,
          minutes: true,
          seconds: true,
          rest: false,
          style: 'military',
          isUtcMethods: false,
        })

        params.pathFileAbs = join(__dirname, '__output__', `${dateString}_image.png`)

        const output = await getRunWithSpinner(getBase64ToImage, 'Processing... ')(
          params,
          options,
        )

        consoler(`getBase64ToImage [90-${index}]`, {
          description,
          imageBase64,
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
