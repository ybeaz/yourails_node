import { spawn } from 'child_process'
import {
  FuncModeEnumType,
  WithTryCatchFinallyWrapperOptionsType,
  withTryCatchFinallyWrapper,
} from 'yourails_common'
import { consoler, consolerError } from 'yourails_node'

type GetAudioDurationParamsType = { pathFileAbs: string }

type GetAudioDurationOptionsType = { funcParent?: string }

type GetAudioDurationResType = number

type GetAudioDurationType = (
  params: GetAudioDurationParamsType,
  options?: GetAudioDurationOptionsType,
) => Promise<GetAudioDurationResType>

const optionsDefault = {
  funcParent: 'getAudioDuration',
} satisfies Required<GetAudioDurationOptionsType>

/**
 * @prompt Context: Javascript chanllendge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
 */

/**
 * @description Function to run ffprobe and get audio duration
 * @import import { getAudioDuration } from './getAudioDuration'
 */
const getAudioDurationUnsafe: GetAudioDurationType = (
  { pathFileAbs }: GetAudioDurationParamsType,
  options: GetAudioDurationOptionsType = optionsDefault,
) => {
  return new Promise((resolve, reject) => {
    const probe = spawn('ffprobe', [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      pathFileAbs,
    ])

    let output = ''
    let errorOutput = ''

    probe.stdout.on('data', (d) => (output += d.toString()))
    probe.stderr.on('data', (d) => (errorOutput += d.toString()))

    probe.on('close', () => {
      const duration = parseFloat(output.trim())

      if (!duration || isNaN(duration)) {
        console.error('ffprobe failed for:', pathFileAbs)
        console.error('stdout:', output)
        console.error('stderr:', errorOutput)
        reject(new Error('Invalid duration'))
      } else {
        resolve(duration)
      }
    })

    probe.on('error', reject)
  })
}

const resDefault: GetAudioDurationResType = 0

const getAudioDuration = withTryCatchFinallyWrapper<
  GetAudioDurationParamsType,
  GetAudioDurationOptionsType,
  GetAudioDurationResType
>(getAudioDurationUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetAudioDurationTestType = {
  description?: string
  params: Parameters<typeof getAudioDuration>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options: Parameters<typeof getAudioDuration>[1]
  expected: ReturnType<typeof getAudioDuration>
}

const getAudioDurationTests: GetAudioDurationTestType[] = [
  {
    description: 'basic test getAudioDuration',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails-nestjs-server-4/cdkMediaCrud/getAudioDuration/__mocks__/kokoro-af_bella-0.9.wav',
    },
    options: {},
    expected: 26.65,
  },
]

export type {
  GetAudioDurationOptionsType,
  GetAudioDurationParamsType,
  GetAudioDurationResType,
  GetAudioDurationTestType,
  GetAudioDurationType,
}
export { getAudioDuration, getAudioDurationTests }

/**
 * @description Here the file is being run directly
 * @run npx tsx cdkMediaCrud/getAudioDuration/getAudioDuration.ts
 * @test pnpm jest getAudioDuration.test.ts --coverage --collectCoverageFrom="cdkMediaCrud/getAudioDuration/getAudioDuration.ts"
 */
if (require.main === module) {
  ;(async () => {
    const promises = getAudioDurationTests.map(
      async (test: GetAudioDurationTestType, index: number) => {
        const { description, params, options, expected } = test

        const output = await getAudioDuration(params, options)
        consoler(`getAudioDuration [90-${index}]`, {
          description,
          params,
          expected,
          output,
          tested: JSON.stringify(output) === JSON.stringify(expected),
        })
      },
    )
    await Promise.all(promises)
  })()
}
