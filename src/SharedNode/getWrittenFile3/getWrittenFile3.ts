import {
  FileTypeEnum,
  FuncModeEnumType,
  timeout,
  withTryCatchFinallyWrapper,
} from 'yourails_common'
import { consoler } from '../consoler'
import {
  GetBase64ToImageOptionsType,
  GetBase64ToImageParamsType,
  getBase64ToImage,
} from '../getBase64ToImage/getBase64ToImage'
import { getEnsuredDirectory } from '../getEnsuredDirectory'

const toCSV = (data: Record<string, unknown>[]): string => {
  if (!Array.isArray(data) || data.length === 0) return ''

  const csvEscape = (value: unknown): string => {
    if (value === null || value === undefined) return ''

    const str =
      typeof value === 'string'
        ? value
        : typeof value === 'object'
          ? JSON.stringify(value)
          : String(value)

    // Escape double quotes according to CSV rules.
    // Always wrap the value in double quotes.
    return `"${str.replaceAll('"', '""')}"`
  }

  // Get all columns from all rows.
  const headers = [...new Set(data.flatMap((row) => Object.keys(row)))]

  const headerRow = headers.map(csvEscape).join(',')

  const rows = data.map((row) => headers.map((header) => csvEscape(row[header])).join(','))

  return [headerRow, ...rows].join('\n')
}

type GetWrittenFile3ParamsType = {
  pathFileAbs: string
  data: any
}

type GetWrittenFile3OptionsType = {
  fileType?: FileTypeEnum
  isOverwrite?: boolean
  funcParent?: string
}

type GetWrittenFile3ResType = { mediaType: string; data: any; pathFileAbsOutput: string }

type GetWrittenFile3Type = (
  params: GetWrittenFile3ParamsType,
  options?: GetWrittenFile3OptionsType,
) => Promise<GetWrittenFile3ResType>

const optionsDefault = {
  fileType: FileTypeEnum.json,
  isOverwrite: true,
  funcParent: 'getWrittenFile3',
} satisfies Required<GetWrittenFile3OptionsType>

const resDefault: GetWrittenFile3ResType = {
  mediaType: 'text/plain',
  data: '',
  pathFileAbsOutput: '',
}

/**
 * @prompt Context: Javascript chanllendge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
 */

/**
 * @description Function to getWrittenFile3
   @usage
   import { getWrittenFile3, GetWrittenFile3ParamsType, GetWrittenFile3OptionsType } from './getWrittenFile3/getWrittenFile3'
   const getWrittenFile3Params: GetWrittenFile3ParamsType = {}
   const getWrittenFile3Options: GetWrittenFile3OptionsType = {}
   getWrittenFile3(getWrittenFile3Params, getWrittenFile3Options)
 */
const getWrittenFile3Unsafe: GetWrittenFile3Type = async (
  { pathFileAbs, data: dataIn }: GetWrittenFile3ParamsType,
  options: GetWrittenFile3OptionsType = optionsDefault,
) => {
  if (typeof window !== 'undefined') return resDefault

  const { promises: fsa } = await import('fs')

  const { fileType, funcParent, isOverwrite } = {
    ...optionsDefault,
    ...options,
  }

  const dir = pathFileAbs.split('/').slice(0, -1).join('/')
  await getEnsuredDirectory({ path: dir })

  let output: GetWrittenFile3ResType

  switch (fileType) {
    case FileTypeEnum.json:
      {
        const data = JSON.stringify(dataIn, null, 2)
        output = { mediaType: '', data, pathFileAbsOutput: pathFileAbs }
      }
      break

    case FileTypeEnum.csv:
      {
        const data = toCSV(dataIn as any)
        output = { mediaType: '', data, pathFileAbsOutput: pathFileAbs }
      }
      break

    case FileTypeEnum.png:
    case FileTypeEnum.jpeg:
      {
        const getBase64ToImageParams: GetBase64ToImageParamsType = {
          imageBase64: typeof dataIn === 'string' ? dataIn : '',
          pathFileAbsOutput: pathFileAbs,
        }
        const getBase64ToImageOptions: GetBase64ToImageOptionsType = {}
        output = await getBase64ToImage(getBase64ToImageParams, getBase64ToImageOptions)
      }
      break

    case FileTypeEnum.txt:
    default:
      {
        let data: string
        if (typeof dataIn === 'string') {
          // Remove surrounding quotes if the string was accidentally JSON-stringified upstream
          data = dataIn.startsWith('"') && dataIn.endsWith('"') ? JSON.parse(dataIn) : dataIn
        } else {
          data = JSON.stringify(dataIn, null, 2)
        }
        output = { mediaType: 'text/plain', data, pathFileAbsOutput: pathFileAbs }
      }
      break
  }

  const isImage = fileType === FileTypeEnum.png || fileType === FileTypeEnum.jpeg

  if (!isImage)
    if (isOverwrite) {
      await fsa.writeFile(pathFileAbs, output.data as string, 'utf8')
    } else {
      if (typeof output.data === 'string')
        await fsa.writeFile(pathFileAbs, output.data, {
          flag: 'wx', // fail if exists
        })
      else return resDefault
    }

  return output
}

const getWrittenFile3 = withTryCatchFinallyWrapper<
  GetWrittenFile3ParamsType,
  GetWrittenFile3OptionsType,
  GetWrittenFile3ResType
>(getWrittenFile3Unsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetWrittenFile3CaseType = {
  description?: string
  params: Parameters<typeof getWrittenFile3>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options: Parameters<typeof getWrittenFile3>[1]
  expected: ReturnType<typeof getWrittenFile3>
}

export type {
  GetWrittenFile3CaseType,
  GetWrittenFile3OptionsType,
  GetWrittenFile3ParamsType,
  GetWrittenFile3ResType,
  GetWrittenFile3Type,
}
export { getWrittenFile3 }
