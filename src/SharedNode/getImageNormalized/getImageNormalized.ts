import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import { FuncModeEnumType, ImageAspectRatioEnum, withTryCatchFinallyWrapper } from 'yourails_common'
import { consoler } from '../consoler'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import { getSpawnedProcess } from '../getSpawnedProcess/getSpawnedProcess'
import { getEnsuredReadable } from './getEnsuredReadable'
import { withRawSuffix } from './withRawSuffix'

type GetImageNormalizedParamsType = { pathFileAbsInput: string; pathFileAbsOutput: string }

type GetImageNormalizedOptionsType = {
  imageAspectRatio?: ImageAspectRatioEnum
  isQuiet?: boolean
  isCopyingRaw?: boolean
  funcParent?: string
}

type GetImageNormalizedResType = { pathFileAbsOutputRaw: string; pathFileAbsOutput: string }

type GetImageNormalizedType = (
  params: GetImageNormalizedParamsType,
  options?: GetImageNormalizedOptionsType,
) => Promise<GetImageNormalizedResType>

const optionsDefault = {
  imageAspectRatio: ImageAspectRatioEnum.default,
  isQuiet: false,
  isCopyingRaw: false,
  funcParent: 'getImageNormalized',
} satisfies Required<GetImageNormalizedOptionsType>

const DEFAULT_SIZE = { w: 1536, h: 1024 } as const

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
  {
    isQuiet,
    isCopyingRaw = false,
    imageAspectRatio = ImageAspectRatioEnum['16:9_strech'],
  }: GetImageNormalizedOptionsType = optionsDefault,
) => {
  consoler('getImageNormalized [55]', { pathFileAbsInput })
  await getEnsuredReadable({ pathFileAbsInput })

  // 1) copy input → *_raw
  let pathFileAbsOutputRaw = ''
  if (isCopyingRaw) {
    pathFileAbsOutputRaw = withRawSuffix({ pathFileAbsInput })
    await copyFile(pathFileAbsInput, pathFileAbsOutputRaw)
  }

  // 2) build magick args
  const target =
    imageAspectRatio === ImageAspectRatioEnum['16:9_crop'] || ImageAspectRatioEnum['16:9_strech']
      ? { w: 1536, h: 864 }
      : DEFAULT_SIZE

  const sharedPrefix = ['-quiet', pathFileAbsInput, '-auto-orient', '-strip', '-colorspace', 'sRGB']

  const RESIZE_DICT: Record<ImageAspectRatioEnum, string[]> = {
    default: [
      '-resize',
      `${target.w}x${target.h}`,
      '-background',
      'white',
      '-gravity',
      'center',
      '-extent',
      `${target.w}x${target.h}`,
    ],
    '16:9_crop': [
      '-resize',
      `${Math.round(target.w * 1.15)}x${Math.round(target.h * 1.15)}`,
      '-gravity',
      'center',
      '-crop',
      `${target.w}x${target.h}+0+0`,
      '+repage',
    ],
    '16:9_strech': ['-resize', `${target.w}x${target.h}!`, '+repage'],
  }

  const resizeArgs = RESIZE_DICT[imageAspectRatio]

  const args = [...sharedPrefix, ...resizeArgs, pathFileAbsOutput]

  // 3) run magick pipeline
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
      pathFileAbsInput: join(__dirname, '/__mocks__/s_0_2026-06-14-08-58-46_image.png'),
      pathFileAbsOutput: join(__dirname, '/__mocks__/s_0_2026-06-14-08-58-46_2_image.png'),
    },
    options: {
      isQuiet: true,
      isCopyingRaw: true,
      imageAspectRatio: ImageAspectRatioEnum['16:9_strech'],
    },
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
