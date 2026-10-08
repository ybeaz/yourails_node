import {
  FileTypeEnum,
  FuncModeEnumType,
  timeout,
  withTryCatchFinallyWrapper,
} from 'yourails_common'
import { consoler } from '../consoler'
import { getEnsuredDirectory } from '../getEnsuredDirectory'

const toCSV = (data: Record<string, any>[]): string => {
  if (!Array.isArray(data) || data.length === 0) return ''

  const headers = Object.keys(data[0])

  const rows = data.map((row) => headers.map((h) => JSON.stringify(row[h] ?? '')).join(','))

  return [headers.join(','), ...rows].join('\n')
}

type GetWrittenFile2ParamsType<T> = {
  pathFileAbs: string
  data: T
}

type GetWrittenFile2OptionsType = {
  fileType?: FileTypeEnum
  isOverwrite?: boolean
  funcParent?: string
}

type GetWrittenFile2ResType<T> = T

type GetWrittenFile2Type<T> = (
  params: GetWrittenFile2ParamsType<T>,
  options?: GetWrittenFile2OptionsType,
) => GetWrittenFile2ResType<T>

const optionsDefault = {
  fileType: FileTypeEnum.json,
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
 * @import import { GetWrittenFile2OptionsType, GetWrittenFile2ParamsType, getWrittenFile2 } from './getWrittenFile2'
 */
const getWrittenFile2Unsafe: GetWrittenFile2Type<unknown> = async (
  { pathFileAbs, data }: GetWrittenFile2ParamsType<unknown>,
  options: GetWrittenFile2OptionsType = optionsDefault,
) => {
  if (typeof window !== 'undefined') return

  const fs = require('fs')
  const { promises: fsa } = await import('fs')

  const { fileType, funcParent, isOverwrite } = {
    ...optionsDefault,
    ...options,
  }

  const path = pathFileAbs.split('/').slice(0, -1).join('/')
  await getEnsuredDirectory({ path })

  let output: string

  switch (fileType) {
    case FileTypeEnum.json:
      output = JSON.stringify(data, null, 2)
      break

    case FileTypeEnum.csv:
      output = toCSV(data as Record<string, any>[])
      break

    case FileTypeEnum.txt:
    default:
      if (typeof data === 'string') {
        // Remove surrounding quotes if the string was accidentally JSON-stringified upstream
        output = data.startsWith('"') && data.endsWith('"') ? JSON.parse(data) : data
      } else {
        output = JSON.stringify(data, null, 2)
      }
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

type GetWrittenFile2CaseType = {
  description?: string
  params: Parameters<typeof getWrittenFile2>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options: Parameters<typeof getWrittenFile2>[1]
  expected: ReturnType<typeof getWrittenFile2>
}

export type {
  GetWrittenFile2CaseType,
  GetWrittenFile2OptionsType,
  GetWrittenFile2ParamsType,
  GetWrittenFile2ResType,
  GetWrittenFile2Type,
}
export { getWrittenFile2 }
