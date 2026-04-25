import { timeout } from 'yourails_common'

import { consoler } from 'yourails_common'
import { withTryCatchFinallyWrapper, FuncModeEnumType } from 'yourails_common'
import { getEnsuredDirectory } from '../getEnsuredDirectory'
import { FileTypeEnum } from 'yourails_common'

const toCSV = (data: Record<string, any>[]): string => {
  if (!Array.isArray(data) || data.length === 0) return ''

  const headers = Object.keys(data[0])

  const rows = data.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','))

  return [headers.join(','), ...rows].join('\n')
}

type GetWrittenFile2ParamsType<T> = {
  pathFileAbs: string
  data: T
}

type GetWrittenFile2OptionsType = {
  typeFile?: FileTypeEnum
  isOverwrite?: boolean
  funcParent?: string
}

type GetWrittenFile2ResType<T> = T

interface GetWrittenFile2Type<T> {
  (
    params: GetWrittenFile2ParamsType<T>,
    options?: GetWrittenFile2OptionsType
  ): GetWrittenFile2ResType<T>
}

const optionsDefault = {
  typeFile: FileTypeEnum.json,
  isOverwrite: true,
  funcParent: 'getWrittenFile2',
} satisfies Required<GetWrittenFile2OptionsType>

/**
 * @prompt Context: Javascript chanllendge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
 */

/**
 * @description Function to getWrittenFile2
 * @import import { getWrittenFile2 } from './getWrittenFile2'
 */
const getWrittenFile2Unsafe: GetWrittenFile2Type<unknown> = async (
  { pathFileAbs, data }: GetWrittenFile2ParamsType<unknown>,
  options: GetWrittenFile2OptionsType = optionsDefault
) => {
  if (typeof window !== 'undefined') return

  const fs = require('fs')
  const { promises: fsa } = await import('fs')

  const { typeFile, funcParent, isOverwrite } = {
    ...optionsDefault,
    ...options,
  }

  const path = pathFileAbs.split('/').slice(0, -1).join('/')
  await getEnsuredDirectory({ path })

  let output: string

  switch (typeFile) {
    case FileTypeEnum.json:
      output = JSON.stringify(data, null, 2)
      break

    case FileTypeEnum.csv:
      output = toCSV(data as Record<string, any>[])
      break

    case FileTypeEnum.txt:
    default:
      output = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
      break
  }

  if (isOverwrite) {
    await fsa.writeFile(pathFileAbs, output, 'utf8')
  } else {
    await fsa.writeFile(pathFileAbs, output, {
      flag: 'wx', // fail if exists
    })
  }

  return output
}

const resDefault: GetWrittenFile2ResType<unknown> = ''

const getWrittenFile2 = withTryCatchFinallyWrapper<
  GetWrittenFile2ParamsType<unknown>,
  GetWrittenFile2OptionsType,
  GetWrittenFile2ResType<unknown>
>(getWrittenFile2Unsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetWrittenFile2TestType = {
  description?: string
  params: Parameters<typeof getWrittenFile2>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options: Parameters<typeof getWrittenFile2>[1]
  expected: ReturnType<typeof getWrittenFile2>
}

const getWrittenFile2Tests: GetWrittenFile2TestType[] = [
  {
    description: 'save JSON object basic',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/text.json',
      data: { a: 1, b: 'b2', c: [null, 'b', 3] },
    },
    options: {},
    expected: '{\n  "a": 1,\n  "b": "b2",\n  "c": [\n    null,\n    "b",\n    3\n  ]\n}',
  },

  {
    description: 'save TXT string basic',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/text.txt',
      data: 'Hello world from TXT file\nSecond line\nThird line',
    },
    options: {},
    expected: '"Hello world from TXT file\\nSecond line\\nThird line"',
  },

  {
    description: 'save TXT from object (fallback JSON stringify)',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/object.txt',
      data: { hello: 'world', n: 123 },
    },
    options: {},
    expected: '{\n  "hello": "world",\n  "n": 123\n}',
  },

  {
    description: 'save TXT from object (fallback JSON stringify)',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/textUnicode.txt',
      data: `Hello world from getWrittenFile2
This is a second line
And this is a third line
Special chars: !@#$%^&*()
Unicode: 🚀🔥✨`,
    },
    options: {},
    expected:
      '"Hello world from getWrittenFile2\\nThis is a second line\\nAnd this is a third line\\nSpecial chars: !@#$%^&*()\\nUnicode: 🚀🔥✨"',
  },

  {
    description: 'save CSV array of objects basic',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/text.csv',
      data: [
        { name: 'John', age: 30, city: 'New York' },
        { name: 'Jane', age: 25, city: 'San Francisco' },
        { name: 'Bob', age: 40, city: 'Los Angeles' },
      ],
    },
    options: { typeFile: FileTypeEnum.csv },
    expected:
      'name,age,city\n' +
      '"John",30,"New York"\n' +
      '"Jane",25,"San Francisco"\n' +
      '"Bob",40,"Los Angeles"',
  },

  {
    description: 'save JSON with overwrite enabled',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/overwrite.json',
      data: { overwrite: true },
    },
    options: { isOverwrite: true },
    expected: '{\n  "overwrite": true\n}',
  },

  {
    description: 'save CSV empty array',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/empty.csv',
      data: [],
    },
    options: { typeFile: FileTypeEnum.csv },
    expected: '',
  },
]

export { getWrittenFile2, getWrittenFile2Tests }
export type {
  GetWrittenFile2ParamsType,
  GetWrittenFile2ResType,
  GetWrittenFile2OptionsType,
  GetWrittenFile2Type,
  GetWrittenFile2TestType,
}

/**
 * @description Here the file is being run directly
 * @run npx tsx src/SharedNode/getWrittenFile2/getWrittenFile2.ts
 * @test pnpm jest getWrittenFile2.test.ts --coverage --collectCoverageFrom="src/Shared/getWrittenFile2.ts"
 */
if (require.main === module) {
  ;(async () => {
    const promises = getWrittenFile2Tests.map(
      async (test: GetWrittenFile2TestType, index: number) => {
        const { description, params, options, expected } = test

        const output = await getWrittenFile2(params, options)
        consoler(`getWrittenFile2 [61-${index}]`, {
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
