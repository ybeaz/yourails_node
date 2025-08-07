import { consoler } from '../SharedNode/consoler'
import {
  getWrittenJsonFile,
  GetWrittenJsonFileParamsType,
  GetWrittenJsonFileOptionsType,
} from './getWrittenJsonFile'
import { withTryCatchFinallyWrapper, FuncModeEnumType } from 'yourails_common'

type GetReadCsvToJsonToJsonParamsType = {
  baseDir: string
  filePathParts: string[]
}

type GetReadCsvToJsonToJsonOptionsType = {
  fieldDelimiter?: string
  quote?: string
  isWritingJson?: boolean
  isOverwrite?: boolean
  funcParent?: string
}

type GetReadCsvToJsonToJsonResType = void

interface GetReadCsvToJsonToJsonType {
  (
    params: GetReadCsvToJsonToJsonParamsType,
    options?: GetReadCsvToJsonToJsonOptionsType
  ): GetReadCsvToJsonToJsonResType
}

const optionsDefault: Required<GetReadCsvToJsonToJsonOptionsType> = {
  fieldDelimiter: ';',
  quote: '"',
  isWritingJson: false,
  isOverwrite: true,
  funcParent: 'getReadCsvToJsonToJson',
}

/**
 * @description Function to getReadCsvToJsonToJson
 * @import import { getReadCsvToJsonToJson } from './getReadCsvToJsonToJson'
 */

const getReadCsvToJsonToJsonUnsafe: GetReadCsvToJsonToJsonType = async (
  params: GetReadCsvToJsonToJsonParamsType,
  options?: GetReadCsvToJsonToJsonOptionsType
) => {
  if (typeof window !== 'undefined') return
  const csvjson = require('csvjson')

  const { baseDir, filePathParts } = params
  const {
    fieldDelimiter = ';',
    quote = '"',
    isWritingJson = false,
    isOverwrite,
  } = options || optionsDefault

  const filePath = `${[baseDir, ...filePathParts].join('/')}`
  const { promises: fsa } = await import('fs')

  const data = await fsa.readFile(filePath, 'utf8')

  var optionsCsvjson = {
    delimiter: fieldDelimiter,
    quote,
  }
  const arrayObjects = csvjson.toObject(data, optionsCsvjson)

  if (isWritingJson)
    await getWrittenJsonFile(
      {
        baseDir,
        filePathParts: [...filePathParts.slice(0, -1), `${filePathParts.at(-1)}.json`],
        data: arrayObjects,
      } as GetWrittenJsonFileParamsType,
      { isOverwrite } as GetWrittenJsonFileOptionsType
    )

  return arrayObjects
}

const getReadCsvToJsonToJson = withTryCatchFinallyWrapper(getReadCsvToJsonToJsonUnsafe, {
  optionsDefault,
  resDefault: undefined,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export { getReadCsvToJsonToJson, getReadCsvToJsonToJsonUnsafe }
export type {
  GetReadCsvToJsonToJsonParamsType,
  GetReadCsvToJsonToJsonOptionsType,
  GetReadCsvToJsonToJsonResType,
  GetReadCsvToJsonToJsonType,
}
/**
 * @description Here the file is being run directly
 * @run ts-node src/SharedNode/getReadCsvToJsonToJson.ts
 */
if (require.main === module) {
  ;(async () => {
    const examples: {
      params: GetReadCsvToJsonToJsonParamsType
      options: GetReadCsvToJsonToJsonOptionsType
    }[] = [
      {
        params: {
          baseDir: __dirname,
          filePathParts: ['__mocks__', '2025-07-20-19-46-00-TLT_ditributions.csv'],
        },
        options: {
          fieldDelimiter: ',',
          isWritingJson: true,
        },
      },
    ]

    examples.map(async (example: any, index: number) => {
      const { params, options, expected } = example

      const output = await getReadCsvToJsonToJson(params, options)
    })
  })()
}
