import { join } from 'node:path'
import { getDateString } from 'yourails_common'
import { consoler } from '../consoler'
import { getReadFile2 } from '../getReadFile2/getReadFile2'
import { getRunWithSpinner } from '../getRunWithSpinner'
import {
  type GetImageBase64SavedToFileCaseType,
  getImageBase64SavedToFile,
} from './getImageBase64SavedToFile'

/**
 * @run npx tsx src/SharedNode/getImageBase64SavedToFile/getImageBase64SavedToFile.run.ts
 */
if (require.main === module) {
  ;(async () => {
    const getImageBase64SavedToFileCases = await import('./getImageBase64SavedToFile.case').then(
      (m) => m.getImageBase64SavedToFileCases,
    )

    const promises = getImageBase64SavedToFileCases.map(
      async (
        { description, params, options, expected }: GetImageBase64SavedToFileCaseType,
        index: number,
      ) => {
        const imageBase64: string = (await getReadFile2({
          pathFileAbs: join(__dirname, '__mocks__', 's_5_2026-05-27-21-02-16_imageRaw.txt'),
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
        })

        params.pathFileAbs = join(__dirname, '__output__', `${dateString}_image.png`)

        const output = await getRunWithSpinner(getImageBase64SavedToFile, 'Processing... ')(
          params,
          options,
        )

        consoler(`getImageBase64SavedToFile [90-${index}]`, {
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
