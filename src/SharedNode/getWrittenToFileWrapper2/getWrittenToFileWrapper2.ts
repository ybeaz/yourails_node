import { basename, dirname, extname, join } from 'node:path'
import {
  FileTypeEnum,
  FuncModeEnumType,
  GetUniqArrByLastParamsType,
  getUniqArrByLast,
  withTryCatchFinallyWrapper,
} from 'yourails_common'
import { consoler } from '../consoler'
import { GetReadFile2ParamsType, getReadFile2 } from '../getReadFile2/getReadFile2'
import {
  GetWrittenCsvFileOptionsType,
  GetWrittenCsvFileParamsType,
  getWrittenCsvFile,
} from '../getWrittenCsvFile'
import { GetWrittenFile2ParamsType, getWrittenFile2 } from '../getWrittenFile2/getWrittenFile2'
import { isDirectoryFile } from '../isDirectoryFile'

type GetWrittenToFileWrapper2ParamsType = {
  pathFileAbs: string
  dataArray: any[]
  isWritingDataJson?: boolean
  isWritingDataCsv?: boolean
}

type GetWrittenToFileWrapper2OptionsType = {
  funcParent?: string
  mode?: 'lastData' | 'accumulateData'
  propKey?: string
}

type GetWrittenToFileWrapper2ResType = {
  pathFileAbsJson: string
  pathFileAbsCsv: string
}

type GetWrittenToFileWrapper2Type = (
  params: GetWrittenToFileWrapper2ParamsType,
  options?: GetWrittenToFileWrapper2OptionsType,
) => Promise<GetWrittenToFileWrapper2ResType>

const optionsDefault = {
  funcParent: 'getWrittenToFileWrapper2',
  mode: 'lastData',
  propKey: '',
} satisfies Required<GetWrittenToFileWrapper2OptionsType>

const resDefault: GetWrittenToFileWrapper2ResType = {
  pathFileAbsJson: '',
  pathFileAbsCsv: '',
}

/**
 * @description Function to getWrittenToFileWrapper2
 * @import import { getWrittenToFileWrapper2, GetWrittenToFileWrapper2ParamsType, GetWrittenToFileWrapper2OptionsType } from './getWrittenToFileWrapper2/getWrittenToFileWrapper2'
 */
const getWrittenToFileWrapper2Unsafe: GetWrittenToFileWrapper2Type = async (
  {
    pathFileAbs: pathFileAbsIn,
    dataArray: dataArrayIn,
    isWritingDataJson = false,
    isWritingDataCsv = false,
  }: GetWrittenToFileWrapper2ParamsType,
  { mode, propKey }: GetWrittenToFileWrapper2OptionsType = optionsDefault,
) => {
  if (isWritingDataCsv || isWritingDataJson) {
    let dataArrayPrev: any[] = []
    const { isExisting: isDirectoryFileExisting } = await isDirectoryFile({ path: pathFileAbsIn })

    let dataArray = dataArrayIn

    if (mode === 'accumulateData' && isDirectoryFileExisting) {
      const getReadFile2Params: GetReadFile2ParamsType = { pathFileAbs: pathFileAbsIn }
      dataArrayPrev = (await getReadFile2(getReadFile2Params)) as any[]
    }

    if (propKey) {
      const getUniqArrByLastParams: GetUniqArrByLastParamsType = {
        props: [propKey || ''],
        arrInp: [...dataArrayPrev, ...dataArrayIn],
      }
      dataArray = await getUniqArrByLast(getUniqArrByLastParams)
    } else {
      dataArray = [...dataArrayPrev, ...dataArrayIn]
    }

    const dir = dirname(pathFileAbsIn)
    const filename = basename(pathFileAbsIn, extname(pathFileAbsIn))
    const pathFileAbsJson = join(dir, `${filename}.${FileTypeEnum.json}`)
    const pathFileAbsCsv = join(dir, `${filename}.${FileTypeEnum.csv}`)

    if (isWritingDataJson) {
      const getWrittenJsonFileParams: GetWrittenFile2ParamsType<any[]> = {
        pathFileAbs: pathFileAbsJson,
        data: dataArray,
      }
      await getWrittenFile2(getWrittenJsonFileParams)
    }

    if (isWritingDataCsv) {
      const getWrittenCsvFile2Params: GetWrittenCsvFileParamsType = {
        data: dataArray,
        baseDir: '',
        filePathParts: [pathFileAbsCsv],
      }

      const keysMax = Object.keys(
        dataArray.reduce((accum: any, item: any) => {
          return { ...accum, ...item }
        }, {}),
      )

      const getWrittenCsvFileOptions: GetWrittenCsvFileOptionsType = {
        fieldDelimiter: ';',
        header: keysMax.map((key: string) => ({ id: key, title: key })),
        firstLine: 'sep=;',
      }
      await getWrittenCsvFile(getWrittenCsvFile2Params, getWrittenCsvFileOptions)
    }

    return {
      pathFileAbsJson,
      pathFileAbsCsv,
    }
  }
  return resDefault
}

const getWrittenToFileWrapper2 = withTryCatchFinallyWrapper<
  GetWrittenToFileWrapper2ParamsType,
  GetWrittenToFileWrapper2OptionsType,
  GetWrittenToFileWrapper2ResType
>(getWrittenToFileWrapper2Unsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetWrittenToFileWrapper2CaseType = {
  description?: string
  params: Parameters<typeof getWrittenToFileWrapper2>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getWrittenToFileWrapper2>[1]
  expected: ReturnType<typeof getWrittenToFileWrapper2>
}

export type {
  GetWrittenToFileWrapper2CaseType,
  GetWrittenToFileWrapper2OptionsType,
  GetWrittenToFileWrapper2ParamsType,
  GetWrittenToFileWrapper2ResType,
  GetWrittenToFileWrapper2Type,
}
export { getWrittenToFileWrapper2 }
