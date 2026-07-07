import { join } from 'node:path'
import { FileTypeEnum } from 'yourails_common'
import { consoler } from '../consoler'
import { getImageCroppedBySize } from '../getImageCroppedBySize/getImageCroppedBySize'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import { getWrittenFile2 } from '../getWrittenFile2/getWrittenFile2'
import { type GetImageToBase64CaseType, getImageToBase64 } from './getImageToBase64'

/**
 * @run npx tsx src/SharedNode/getImageToBase64/getImageToBase64.run.ts
 * @test pnpm jest getImageToBase64.test.ts --coverage --collectCoverageFrom="src/SharedNode/getImageToBase64/getImageToBase64.ts"
 */
if (require.main === module) {
  ;(async () => {
    const getImageToBase64Cases = await import('./getImageToBase64.case').then(
      (m) => m.getImageToBase64Cases,
    )

    const promises = getImageToBase64Cases.map(
      async (
        { description, params, options, expected }: GetImageToBase64CaseType,
        index: number,
      ) => {
        const imageBase64 = await getRunWithSpinner(getImageToBase64, 'Processing... ')(
          params,
          options,
        )

        // const pathFileAbsPng = join(__dirname, '__output__/xxx.png')

        // const base64v2 = await getImageCroppedBySize({
        //   imageBase64,
        //   positionStartX: 0,
        //   positionStartY: 0,
        //   targetWidth: 1536,
        //   targetHeight: 512,
        //   pathFileAbs: pathFileAbsPng,
        // })

        // getSavedBase64ToFile({ b64String: base64v2, pathFile: 'xxx.png', format: 'png' })

        const pathFileAbsTxt = join(__dirname, '__output__/xxx.txt')

        await getWrittenFile2(
          { pathFileAbs: pathFileAbsTxt, data: { imageBase64 } },
          { typeFile: FileTypeEnum.json },
        )

        consoler(`getImageToBase64 [90-${index}]`, {
          description,
          params,
          // output: imageBase64,
          // expected,
          // tested: JSON.stringify(output) === JSON.stringify(expected),
        })
      },
    )

    await Promise.all(promises)
  })()
}
