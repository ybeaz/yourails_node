import { join } from 'node:path'
import { consoler } from '../consoler'
import { getCroppedImageBySize } from '../getCroppedImageBySize/getCroppedImageBySize'
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
        const base64 = await getImageToBase64(params, options)

        const pathFileAbs = join(__dirname, '__output__/xxx.png')

        const base64v2 = await getCroppedImageBySize({
          base64,
          positionStartX: 0,
          positionStartY: 0,
          targetWidth: 1536,
          targetHeight: 512,
          pathFileAbs,
        })

        // getSavedBase64ToFile({ b64String: base64v2, pathFile: 'xxx.png', format: 'png' })

        consoler(`getImageToBase64 [90-${index}]`, {
          description,
          params,
          output: base64v2,
          // expected,
          // tested: JSON.stringify(output) === JSON.stringify(expected),
        })
      },
    )

    await Promise.all(promises)
  })()
}
