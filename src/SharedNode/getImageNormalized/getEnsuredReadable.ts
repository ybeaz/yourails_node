import { constants } from 'node:fs'
import { access } from 'node:fs/promises'

export async function getEnsuredReadable({ pathFileAbsInput }: { pathFileAbsInput: string }) {
  await access(pathFileAbsInput, constants.R_OK)
}

/**
 * @run npx tsx src/SharedNode/getImageNormalized/getEnsuredReadable.ts
 */
if (require.main === module) {
  void (async () => {
    const params = {
      pathFileAbsInput:
        '/Users/admin/Dev/__output__/2026-06-29-18-54-50-Mastering-python-iterators-a-comprehensive-guide/thn_2026-06-29-18-55-06_image.png',
    }

    const output = await getEnsuredReadable(params)

    const expected = undefined

    console.log(`getTemplateFunc [20-${0}]`, {
      params,
      output,
      expected,
      tested: JSON.stringify(output) === JSON.stringify(expected),
    })
  })()
}
