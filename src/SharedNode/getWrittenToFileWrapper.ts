import { join } from 'path'
import { consoler } from 'yourails_common'
import { withTryCatchFinallyWrapper, FuncModeEnumType } from 'yourails_common'
import { getDateString } from 'yourails_common'
import {
  getWrittenCsvFile,
  GetWrittenCsvFileParamsType,
  GetWrittenCsvFileOptionsType,
} from './getWrittenCsvFile'
import { getWrittenJsonFile, GetWrittenJsonFileParamsType } from './getWrittenJsonFile'

type GetWrittenToFileWrapperParamsType = {
  dataArray: any[]
  fileNameBody: string
  baseDir: string
  filePathParts: string[]
  isWritingDataCsv: boolean
  isWritingDataJson: boolean
}

type GetWrittenToFileWrapperOptionsType = { funcParent?: string }

type GetWrittenToFileWrapperResType = any

interface GetWrittenToFileWrapperType {
  (
    params: GetWrittenToFileWrapperParamsType,
    options?: GetWrittenToFileWrapperOptionsType
  ): GetWrittenToFileWrapperResType
}

const optionsDefault: Required<GetWrittenToFileWrapperOptionsType> = {
  funcParent: 'getWrittenToFileWrapper',
}

const resDefault: GetWrittenToFileWrapperResType = ''

/**
 * @description Function to getWrittenToFileWrapper
 * @import import { getWrittenToFileWrapper } from './getWrittenToFileWrapper'
 */

const getWrittenToFileWrapperUnsafe: GetWrittenToFileWrapperType = async (
  {
    dataArray,
    fileNameBody,
    baseDir,
    filePathParts: filePathPartsIn,
    isWritingDataCsv,
    isWritingDataJson,
  }: GetWrittenToFileWrapperParamsType,
  options: GetWrittenToFileWrapperOptionsType = optionsDefault
) => {
  if (isWritingDataCsv || isWritingDataJson) {
    const dateCreated = Date.now()
    const dateString = getDateString({
      timestamp: dateCreated,
      dash: true,
      hours: true,
      minutes: true,
      seconds: true,
    })

    if (isWritingDataJson) {
      const fileName = `${dateString}-${fileNameBody}-n${dataArray.length}.json`
      const filePathParts = [...filePathPartsIn, fileName]
      const getWrittenJsonFileParams: GetWrittenJsonFileParamsType = {
        baseDir,
        filePathParts,
        data: dataArray,
      }
      await getWrittenJsonFile(getWrittenJsonFileParams)
    }

    if (isWritingDataCsv) {
      const fileName = `${dateString}-${fileNameBody}-n${dataArray.length}.csv`
      const filePathParts = [...filePathPartsIn, fileName]
      const getWrittenCsvFileParams: GetWrittenCsvFileParamsType = {
        baseDir,
        filePathParts,
        data: dataArray,
      }

      const keysMax = Object.keys(
        dataArray.reduce((accum: {}, item: any) => {
          return { ...accum, ...item }
        }, {})
      )

      const getWrittenCsvFileOptions: GetWrittenCsvFileOptionsType = {
        fieldDelimiter: ';',
        header: keysMax.map((key: string) => ({ id: key, title: key })),
        firstLine: 'sep=;',
      }
      await getWrittenCsvFile(getWrittenCsvFileParams, getWrittenCsvFileOptions)
    }
  }
}

const getWrittenToFileWrapper = withTryCatchFinallyWrapper(getWrittenToFileWrapperUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export { getWrittenToFileWrapper, getWrittenToFileWrapperUnsafe }
export type {
  GetWrittenToFileWrapperParamsType,
  GetWrittenToFileWrapperOptionsType,
  GetWrittenToFileWrapperResType,
  GetWrittenToFileWrapperType,
}

/**
 * @description Here the file is being run directly
 * @run ts-node src/Shared/getWrittenToFileWrapper.ts
 */
if (require.main === module) {
  ;(async () => {
    type ExampleType = {
      params: GetWrittenToFileWrapperParamsType
      options: GetWrittenToFileWrapperOptionsType
      expected: GetWrittenToFileWrapperResType
    }
    const examples: ExampleType[] = [
      {
        params: {
          dataArray: [],
          fileNameBody: '',
          baseDir: __dirname,
          filePathParts: [],
          isWritingDataCsv: true,
          isWritingDataJson: true,
        },
        options: {},
        expected: '',
      },
    ]

    const promises = examples.map((example: ExampleType, index: number) => {
      const { params, options, expected } = example

      const output = getWrittenToFileWrapper(params, options)
      consoler(`getWrittenToFileWrapper [61-${index}]`, {
        params,
        output,
        tested: JSON.stringify(output) === JSON.stringify(expected),
      })
    })
    await Promise.all(promises)
  })()
}
