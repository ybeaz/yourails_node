import { stat, access } from 'fs/promises'
import { consoler } from 'yourails_common'
import { consolerError } from 'yourails_common'

type GetWaitedForFileParamsType = {
  filePath: string
  timeoutMs?: number
  minSizeBytes?: number
  stableMs?: number
  comment?: string
}

type GetWaitedForFileOptionsType = { funcParent?: string }

type GetWaitedForFileResType = void

interface GetWaitedForFileType {
  (params: GetWaitedForFileParamsType, options?: GetWaitedForFileOptionsType): Promise<void>
}

const optionsDefault = {
  funcParent: 'getWaitedForFile',
} satisfies Required<GetWaitedForFileOptionsType>

const resDefault: GetWaitedForFileResType = undefined

/**
 * @prompt Context: Unit tests typescript challenge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
          [
            {
              description: 'basic test getWaitedForFile',
              params: {},
              options: {},
              expected: '',
            },
          ]
 */

/**
 * @description Function to getWaitedForFile
 * @import import { getWaitedForFile } from './getWaitedForFile'
 */
const getWaitedForFile: GetWaitedForFileType = async (
  {
    filePath,
    timeoutMs = 15000,
    minSizeBytes = 1024,
    stableMs = 500,
    comment = '',
  }: GetWaitedForFileParamsType,
  options: GetWaitedForFileOptionsType = optionsDefault,
) => {
  const deadline = Date.now() + timeoutMs
  let lastSize = -1

  while (Date.now() < deadline) {
    try {
      await access(filePath)
      const { size } = await stat(filePath)

      if (size >= minSizeBytes && size === lastSize) {
        return // File exists, has content, and size is stable
      }
      lastSize = size
    } catch {
      // File not accessible yet
    }
    await new Promise((r) => setTimeout(r, stableMs))
  }

  consolerError('getWaitedForFile [60] File never became ready:', filePath)
  throw new Error(`❌ getWaitedForFile [70] File never became ready: ${filePath}`)
}

type GetWaitedForFileTestType = {
  description?: string
  params: Parameters<typeof getWaitedForFile>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options: Parameters<typeof getWaitedForFile>[1]
  expected: ReturnType<typeof getWaitedForFile>
}

export { getWaitedForFile }
export type {
  GetWaitedForFileParamsType,
  GetWaitedForFileResType,
  GetWaitedForFileOptionsType,
  GetWaitedForFileType,
  GetWaitedForFileTestType,
}

/**
 * @description Here the file is being run directly
 * @run npx tsx src/Shared/getWaitedForFile.ts
 * @test pnpm jest getWaitedForFile.test.ts --coverage --collectCoverageFrom="src/Shared/getWaitedForFile.ts"
 */
/* istanbul ignore next */
if (require.main === module) {
  ;(async () => {
    const getWaitedForFileCases = await import(`${__dirname}/getWaitedForFile.case.ts`).then(
      (m) => m,
    )

    const promises = getWaitedForFileCases.map(
      async (test: GetWaitedForFileTestType, index: number) => {
        const { description, params, options, expected } = test

        const output = await getWaitedForFile(params, options)
        consoler(`getWaitedForFile [90-${index}]`, {
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
