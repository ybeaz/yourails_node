import { join } from 'node:path'
import { FileTypeEnum, getDateString } from 'yourails_common'
import { getImageToBase64 } from '../getImageToBase64/getImageToBase64'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import { type GetWrittenFile3CaseType, getWrittenFile3 } from './getWrittenFile3'
import { getWrittenFile3Cases } from './getWrittenFile3.case'

/**
 * @run npx tsx src/SharedNode/getWrittenFile3/getWrittenFile3.run.ts
 */
if (require.main === module) {
  void (async () => {
    const promises = getWrittenFile3Cases.map(
      async (
        { description, params, options = {}, expected }: GetWrittenFile3CaseType,
        index: number,
      ) => {
        const dateString = getDateString({
          timestamp: new Date(),
          dash: true,
          hours: true,
          minutes: true,
          seconds: true,
          isUtcMethods: false,
        })

        const pathFileAbs = join(__dirname, '__output__', `${dateString}_imageRaw.txt`)

        params.data = await getImageToBase64({
          pathFileAbs:
            '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile3/__mocks__/s_4_2026-05-31-07-28-53_imageRaw.png',
        })
        params.pathFileAbs = pathFileAbs
        options.fileType = FileTypeEnum.txt

        const output = await getRunWithSpinner(getWrittenFile3, 'Processing... ')(params, options)

        console.log(`getWrittenFile3 [90-${index}]`, {
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
