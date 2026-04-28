import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'

import { consoler } from 'yourails_common'
import { withTryCatchFinallyWrapper, FuncModeEnumType } from 'yourails_common'
import { getSpawnedProcess } from '../getSpawnedProcess/getSpawnedProcess'
import { getCheckedMagick } from './getCheckedMagick'
import { getEnsuredReadable } from './getEnsuredReadable'
import { withRawSuffix } from './withRawSuffix'

type GetNormalizedImageParamsType = { pathFileAbsInput: string; pathFileAbsOutput: string }

type GetNormalizedImageOptionsType = { isCopingRaw?: boolean; funcParent?: string }

type GetNormalizedImageResType = { pathFileAbsOutputRaw: string; pathFileAbsOutput: string }

interface GetNormalizedImageType {
  (
    params: GetNormalizedImageParamsType,
    options?: GetNormalizedImageOptionsType
  ): Promise<GetNormalizedImageResType>
}

const optionsDefault = {
  isCopingRaw: false,
  funcParent: 'getNormalizedImage',
} satisfies Required<GetNormalizedImageOptionsType>

/**
 * @prompt Context: Javascript chanllendge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
 */

/**
 * @description Function to getNormalizedImage
 * @import import { getNormalizedImage } from './getNormalizedImage'
 */
const getNormalizedImageUnsafe = async (
  { pathFileAbsInput, pathFileAbsOutput }: GetNormalizedImageParamsType,
  { isCopingRaw = false }: GetNormalizedImageOptionsType = optionsDefault
) => {
  await getEnsuredReadable({ pathFileAbsInput })
  await getCheckedMagick()

  // 1) copy input → *_raw
  let pathFileAbsOutputRaw = ''
  if (isCopingRaw) {
    pathFileAbsOutputRaw = withRawSuffix({ pathFileAbsInput })
    await copyFile(pathFileAbsInput, pathFileAbsOutputRaw)
  }

  // 2) run magick pipeline
  const args: string[] = [
    pathFileAbsInput,
    '-auto-orient',
    '-strip',
    '-colorspace',
    'sRGB',
    '-resize',
    '1536x1024',
    '-background',
    'white',
    '-gravity',
    'center',
    '-extent',
    '1536x1024',
    pathFileAbsOutput,
  ]

  await getSpawnedProcess({ cmd: 'magick', args })

  return { pathFileAbsOutputRaw, pathFileAbsOutput }
}

const resDefault: GetNormalizedImageResType = { pathFileAbsOutputRaw: '', pathFileAbsOutput: '' }

const getNormalizedImage = withTryCatchFinallyWrapper<
  GetNormalizedImageParamsType,
  GetNormalizedImageOptionsType,
  GetNormalizedImageResType
>(getNormalizedImageUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetNormalizedImageTestType = {
  description?: string
  params: Parameters<typeof getNormalizedImage>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options: Parameters<typeof getNormalizedImage>[1]
  expected: ReturnType<typeof getNormalizedImage>
}

const getNormalizedImageTests: GetNormalizedImageTestType[] = [
  {
    description: 'basic test getNormalizedImage',
    params: {
      pathFileAbsInput: join(__dirname, '/__mocks__/test.png'),
      pathFileAbsOutput: join(__dirname, '/__mocks__/test.png'),
    },
    options: { isCopingRaw: true },
    expected: {
      pathFileAbsOutputRaw:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getNormalizedImage/__mocks__/test_raw.png',
      pathFileAbsOutput:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getNormalizedImage/__mocks__/test.png',
    },
  },
]

export { getNormalizedImage, getNormalizedImageTests }
export type {
  GetNormalizedImageParamsType,
  GetNormalizedImageResType,
  GetNormalizedImageOptionsType,
  GetNormalizedImageType,
  GetNormalizedImageTestType,
}

/**
 * @description Here the file is being run directly
 * @run npx tsx src/SharedNode/getNormalizedImage/getNormalizedImage.ts
 * @test pnpm jest getNormalizedImage.test.ts --coverage --collectCoverageFrom="src/SharedNode/getNormalizedImage/getNormalizedImage.tss"
 */
if (require.main === module) {
  ;(async () => {
    const promises = getNormalizedImageTests.map(
      async (test: GetNormalizedImageTestType, index: number) => {
        const { description, params, options, expected } = test

        const output = await getNormalizedImage(params, options)
        consoler(`getNormalizedImage [90-${index}]`, {
          description,
          params,
          output,
          expected,
          tested: JSON.stringify(output) === JSON.stringify(expected),
        })
      }
    )
    await Promise.all(promises)
  })()
}
