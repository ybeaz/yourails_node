import { join } from 'path'
import {
  FuncModeEnumType,
  GetArrayObjToArrayPrefixParamsType,
  GetArrayObjToArrayPrefixResType,
  getArrayObjToArrayPrefix,
  getDateString,
  withTryCatchFinallyWrapper,
} from 'yourails_common'
import { consoler } from './consoler'
import {
  GetWrittenCsvFileOptionsType,
  GetWrittenCsvFileParamsType,
  getWrittenCsvFile,
} from './getWrittenCsvFile'
import { GetWrittenJsonFileParamsType, getWrittenJsonFile } from './getWrittenJsonFile'

type GetWrittenToFileWrapperParamsType = {
  dataArray: any[]
  fileNameBody?: string
  baseDir: string
  filePathParts?: string[]
  isDataJsonFlattened?: boolean
  isDataCsvFlattened?: boolean
  isWritingDataJson?: boolean
  isWritingDataCsv?: boolean
  dateTimeAssigned?: number | Date
  isNumDataArrayLength?: boolean
  isUtcMethods?: boolean
  isTForTime?: boolean
}

type GetWrittenToFileWrapperOptionsType = { funcParent?: string }

type GetWrittenToFileWrapperResType = any

type GetWrittenToFileWrapperType = (
  params: GetWrittenToFileWrapperParamsType,
  options?: GetWrittenToFileWrapperOptionsType,
) => GetWrittenToFileWrapperResType

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
    fileNameBody = '',
    baseDir,
    filePathParts: filePathPartsIn = [],
    isDataJsonFlattened = false,
    isDataCsvFlattened = false,
    isWritingDataJson = false,
    isWritingDataCsv = false,
    dateTimeAssigned,
    isNumDataArrayLength = true,
    isUtcMethods = false,
    isTForTime = true,
  }: GetWrittenToFileWrapperParamsType,
  options: GetWrittenToFileWrapperOptionsType = optionsDefault,
) => {
  if (isWritingDataCsv || isWritingDataJson) {
    const dateCreated = !!dateTimeAssigned ? dateTimeAssigned : Date.now()
    const dateString = getDateString({
      timestamp: dateCreated,
      dash: true,
      hours: true,
      minutes: true,
      seconds: true,
      isUtcMethods,
      isTForTime,
    })

    const fileName = `${dateString}-${fileNameBody}${isNumDataArrayLength ? `-n${dataArray.length}` : ``}`

    let dataArrayFlattened: GetArrayObjToArrayPrefixResType = []
    if (isDataJsonFlattened || isDataCsvFlattened)
      dataArrayFlattened = await getArrayObjToArrayPrefix({
        array: dataArray,
      } as GetArrayObjToArrayPrefixParamsType)

    if (isWritingDataJson) {
      const fileNameJson = `${fileName}.json`
      const filePathParts = [...filePathPartsIn, fileNameJson]
      const getWrittenJsonFileParams: GetWrittenJsonFileParamsType = {
        baseDir,
        filePathParts,
        data: isDataJsonFlattened ? dataArrayFlattened : dataArray,
      }
      await getWrittenJsonFile(getWrittenJsonFileParams)
    }

    if (isWritingDataCsv) {
      const dataArrayCsv = isDataCsvFlattened ? dataArrayFlattened : dataArray
      const fileNameCsv = `${fileName}.csv`
      const filePathParts = [...filePathPartsIn, fileNameCsv]
      const getWrittenCsvFileParams: GetWrittenCsvFileParamsType = {
        baseDir,
        filePathParts,
        data: dataArrayCsv,
      }

      const keysMax = Object.keys(
        dataArrayCsv.reduce((accum: {}, item: any) => {
          return { ...accum, ...item }
        }, {}),
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

export type {
  GetWrittenToFileWrapperOptionsType,
  GetWrittenToFileWrapperParamsType,
  GetWrittenToFileWrapperResType,
  GetWrittenToFileWrapperType,
}
export { getWrittenToFileWrapper, getWrittenToFileWrapperUnsafe }

/**
 * @description Here the file is being run directly
 * @run npx tsx src/SharedNode/getWrittenToFileWrapper/getWrittenToFileWrapper.ts
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
          dataArray: [
            { a: 1, b: 'b string', c: [1, 2, 3] },
            { a: 2, b: 'b2 string', c: [2, 3, 4] },
          ],
          fileNameBody: 'xyz',
          baseDir: __dirname,
          filePathParts: ['__output__'],
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
      return null
    })
    await Promise.all(promises)
  })()
}
