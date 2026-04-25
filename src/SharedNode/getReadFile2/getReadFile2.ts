import { parse } from 'csv-parse/sync'

import { consoler } from 'yourails_common'
import {
  withTryCatchFinallyWrapper,
  FuncModeEnumType,
  WithTryCatchFinallyWrapperOptionsType,
} from 'yourails_common'
import { FileTypeEnum } from 'yourails_common'
import { getFileExtension } from 'yourails_common'

import test01 from 'src/SharedNode/getReadFile2/__mocks__/text.json'

type GetReadFile2ParamsType = {
  pathFileAbs: string
}

type GetReadFile2OptionsType = { typeFile?: FileTypeEnum; funcParent?: string }

type GetReadFile2ResType = unknown

interface GetReadFile2Type {
  (params: GetReadFile2ParamsType, options?: GetReadFile2OptionsType): GetReadFile2ResType
}

const optionsDefault = {
  typeFile: FileTypeEnum.json,
  funcParent: 'getReadFile2',
} satisfies Required<GetReadFile2OptionsType>

/**
 * @prompt Context: Javascript chanllendge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
 */

/**
 * @description Function to getReadFile2
 * @import import { getReadFile2 } from './getReadFile2'
 */
const getReadFile2Unsafe: GetReadFile2Type = async (
  { pathFileAbs }: GetReadFile2ParamsType,
  options: GetReadFile2OptionsType = optionsDefault
) => {
  if (typeof window !== 'undefined') return

  const { promises: fsa } = await import('fs')

  const { typeFile: typeFileOption, funcParent } = {
    ...optionsDefault,
    ...options,
  }

  const data = await fsa.readFile(pathFileAbs, 'utf8')

  const detectedType = getFileExtension({ pathFileAbs })
  const typeFile = typeFileOption ?? detectedType ?? FileTypeEnum.txt

  switch (typeFile) {
    case FileTypeEnum.json:
      return JSON.parse(data)

    case FileTypeEnum.csv:
      return parse(data, {
        columns: true /* 👈 THIS is required */,
        skip_empty_lines: true,
        trim: true,
      })

    case FileTypeEnum.txt:
    default:
      return data
  }
}

const resDefault: GetReadFile2ResType = ''

const getReadFile2 = withTryCatchFinallyWrapper<
  GetReadFile2ParamsType,
  GetReadFile2OptionsType,
  GetReadFile2ResType
>(getReadFile2Unsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetReadFile2TestType = {
  description?: string
  params: Parameters<typeof getReadFile2>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options: Parameters<typeof getReadFile2>[1]
  expected: ReturnType<typeof getReadFile2>
}

const getReadFile2Tests: GetReadFile2TestType[] = [
  {
    description: 'read JSON file basic',
    params: {
      pathFileAbs: '/Users/admin/Dev/yourails_node/src/SharedNode/getReadFile2/__mocks__/text.json',
    },
    options: { typeFile: FileTypeEnum.json },
    expected: {
      a: 1,
      b: 'b2',
      c: [null, 'b', 3],
    },
  },

  {
    description: 'read TXT file basic',
    params: {
      pathFileAbs: '/Users/admin/Dev/yourails_node/src/SharedNode/getReadFile2/__mocks__/text.txt',
    },
    options: { typeFile: FileTypeEnum.txt },
    expected: `Hello world from text file\nLine 2: simple content`,
  },

  {
    description: 'read CSV file basic',
    params: {
      pathFileAbs: '/Users/admin/Dev/yourails_node/src/SharedNode/getReadFile2/__mocks__/text.csv',
    },
    options: { typeFile: FileTypeEnum.csv },
    expected: [
      { name: 'John', age: '30', city: 'New York' },
      { name: 'Jane', age: '25', city: 'San Francisco' },
      { name: 'Bob', age: '40', city: 'Los Angeles' },
    ],
  },
]

export { getReadFile2, getReadFile2Tests }
export type {
  GetReadFile2ParamsType,
  GetReadFile2ResType,
  GetReadFile2OptionsType,
  GetReadFile2Type,
  GetReadFile2TestType,
}

/**
 * @description Here the file is being run directly
 * @run npx tsx src/SharedNode/getReadFile2/getReadFile2.ts
 * @test pnpm jest getReadFile2.test.ts --coverage --collectCoverageFrom="src/SharedNode/getReadFile2/getReadFile2.ts"
 */
if (require.main === module) {
  ;(async () => {
    const promises = getReadFile2Tests.map(async (test: GetReadFile2TestType, index: number) => {
      const { description, params, options, expected } = test

      const output = await getReadFile2(params, options)
      consoler(`getReadFile2 [160-${index}]`, {
        description,
        params,
        expected,
        output,
        tested: JSON.stringify(output) === JSON.stringify(expected),
      })
    })
    await Promise.all(promises)
  })()
}
