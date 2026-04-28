import { spawn } from 'child_process'
import { consoler } from 'yourails_common'
import { withTryCatchFinallyWrapper, FuncModeEnumType } from 'yourails_common'

type GetSpawnedProcessParamsType = { cmd: string; args: readonly string[] }

type GetSpawnedProcessOptionsType = { funcParent?: string }

type GetSpawnedProcessResType = unknown

interface GetSpawnedProcessType {
  (
    params: GetSpawnedProcessParamsType,
    options?: GetSpawnedProcessOptionsType
  ): Promise<GetSpawnedProcessResType>
}

const optionsDefault = {
  funcParent: 'getSpawnedProcess',
} satisfies Required<GetSpawnedProcessOptionsType>

/**
 * @prompt Context: Javascript chanllendge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
 */

/**
 * @description Function to getSpawnedProcess
 * @import import { getSpawnedProcess } from './getSpawnedProcess'
 */
const getSpawnedProcessUnsafe: GetSpawnedProcessType = (
  { cmd, args }: GetSpawnedProcessParamsType,
  options: GetSpawnedProcessOptionsType = optionsDefault
) =>
  new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit' })

    p.on('error', reject)
    p.on('close', code => {
      if (code === 0) resolve(null)
      else reject(new Error(`getSpawnedProcess [40] ${cmd} exited with code ${code}`))
    })
  })

const resDefault: GetSpawnedProcessResType = ''

const getSpawnedProcess = withTryCatchFinallyWrapper<
  GetSpawnedProcessParamsType,
  GetSpawnedProcessOptionsType,
  GetSpawnedProcessResType
>(getSpawnedProcessUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetSpawnedProcessTestType = {
  description?: string
  params: Parameters<typeof getSpawnedProcess>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options: Parameters<typeof getSpawnedProcess>[1]
  expected: ReturnType<typeof getSpawnedProcess>
}

const getSpawnedProcessTests: GetSpawnedProcessTestType[] = [
  { description: '', params: { cmd: 'ffmpeg', args: [] }, options: {}, expected: resDefault },
]

export { getSpawnedProcess, getSpawnedProcessTests }
export type {
  GetSpawnedProcessParamsType,
  GetSpawnedProcessResType,
  GetSpawnedProcessOptionsType,
  GetSpawnedProcessType,
  GetSpawnedProcessTestType,
}

/**
 * @description Here the file is being run directly
 * @run npx tsx src/Shared/getSpawnedProcess.ts
 * @test pnpm jest getSpawnedProcess.test.ts --coverage --collectCoverageFrom="src/Shared/getSpawnedProcess.ts"
 */
if (require.main === module) {
  ;(async () => {
    const promises = getSpawnedProcessTests.map(
      async (test: GetSpawnedProcessTestType, index: number) => {
        const { description, params, options, expected } = test

        const output = await getSpawnedProcess(params, options)
        consoler(`getSpawnedProcess [90-${index}]`, {
          description,
          params,
          expected,
          output,
          tested: JSON.stringify(output) === JSON.stringify(expected),
        })
      }
    )
    await Promise.all(promises)
  })()
}
