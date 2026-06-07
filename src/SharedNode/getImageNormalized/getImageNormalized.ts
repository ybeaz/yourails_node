import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'
import { consoler } from '../consoler'
import { getRunWithSpinner } from '../getRunWithSpinner'
import { getSpawnedProcess } from '../getSpawnedProcess/getSpawnedProcess'
import { getEnsuredReadable } from './getEnsuredReadable'
import { withRawSuffix } from './withRawSuffix'

type GetImageNormalizedParamsType = { pathFileAbsInput: string; pathFileAbsOutput: string }

type GetImageNormalizedOptionsType = {
  isQuiet?: boolean
  isCopingRaw?: boolean
  funcParent?: string
}

type GetImageNormalizedResType = { pathFileAbsOutputRaw: string; pathFileAbsOutput: string }

type GetImageNormalizedType = (
  params: GetImageNormalizedParamsType,
  options?: GetImageNormalizedOptionsType,
) => Promise<GetImageNormalizedResType>

const optionsDefault = {
  isQuiet: false,
  isCopingRaw: false,
  funcParent: 'getImageNormalized',
} satisfies Required<GetImageNormalizedOptionsType>

/**
 * @prompt Context: Javascript chanllendge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
 */

/**
 * @description Function to getImageNormalized
 * @import import { getImageNormalized } from './getImageNormalized'
 */
const getImageNormalizedUnsafe = async (
  { pathFileAbsInput, pathFileAbsOutput }: GetImageNormalizedParamsType,
  { isQuiet, isCopingRaw = false }: GetImageNormalizedOptionsType = optionsDefault,
) => {
  await getEnsuredReadable({ pathFileAbsInput })
  /* not to use now, but possible
   await getCheckedMagick() */

  // 1) copy input → *_raw
  let pathFileAbsOutputRaw = ''
  if (isCopingRaw) {
    pathFileAbsOutputRaw = withRawSuffix({ pathFileAbsInput })
    await copyFile(pathFileAbsInput, pathFileAbsOutputRaw)
  }

  // 2) run magick pipeline
  const args: string[] = [
    '-quiet',
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

  await getSpawnedProcess({ cmd: 'magick', args }, { isQuiet })

  return { pathFileAbsOutputRaw, pathFileAbsOutput }
}

const resDefault: GetImageNormalizedResType = { pathFileAbsOutputRaw: '', pathFileAbsOutput: '' }

const getImageNormalized = withTryCatchFinallyWrapper<
  GetImageNormalizedParamsType,
  GetImageNormalizedOptionsType,
  GetImageNormalizedResType
>(getImageNormalizedUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetImageNormalizedTestType = {
  description?: string
  params: Parameters<typeof getImageNormalized>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options: Parameters<typeof getImageNormalized>[1]
  expected: ReturnType<typeof getImageNormalized>
}

const getImageNormalizedTests: GetImageNormalizedTestType[] = [
  {
    description: 'basic test getImageNormalized',
    params: {
      pathFileAbsInput: join(__dirname, '/__mocks__/test.png'),
      pathFileAbsOutput: join(__dirname, '/__mocks__/test.png'),
    },
    options: { isQuiet: true, isCopingRaw: true },
    expected: {
      pathFileAbsOutputRaw:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getImageNormalized/__mocks__/test_raw.png',
      pathFileAbsOutput:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getImageNormalized/__mocks__/test.png',
    },
  },
]

export type {
  GetImageNormalizedOptionsType,
  GetImageNormalizedParamsType,
  GetImageNormalizedResType,
  GetImageNormalizedTestType,
  GetImageNormalizedType,
}
export { getImageNormalized, getImageNormalizedTests }

/**
 * @description Here the file is being run directly
 * @run npx tsx src/SharedNode/getImageNormalized/getImageNormalized.ts
 * @test pnpm jest getImageNormalized.test.ts --coverage --collectCoverageFrom="src/SharedNode/getImageNormalized/getImageNormalized.tss"
 */
if (require.main === module) {
  ;(async () => {
    const promises = getImageNormalizedTests.map(
      async (test: GetImageNormalizedTestType, index: number) => {
        const { description, params, options, expected } = test

        const output = await getRunWithSpinner(getImageNormalized, 'Processing... ')(
          params,
          options,
        )

        consoler(`getImageNormalized [90-${index}]`, {
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
