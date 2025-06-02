import { consoler } from '../SharedNode/consoler'
import {
  withTryCatchFinallyWrapper,
  FuncModeEnumType,
  WithTryCatchFinallyWrapperOptionsType,
} from 'yourails_common'

type GetReadFileParamsType = string

type GetReadFileOptionsType = {
  isJson: boolean
  funcParent?: string
}

type GetReadFileResType = any

interface GetReadFileType {
  (params: GetReadFileParamsType, options?: GetReadFileOptionsType): Promise<GetReadFileResType>
}

const optionsDefault: Required<GetReadFileOptionsType> = {
  isJson: true,
  funcParent: 'getReadFile',
}

const resDefault: GetReadFileResType = ''

const getReadFileUnsafe: GetReadFileType = async (
  path: string,
  options?: GetReadFileOptionsType
) => {
  if (typeof window !== 'undefined') return

  const { isJson = true } = options ?? {}

  const { promises: fsa } = await import('fs')

  const data = await fsa.readFile(path, 'utf8')

  if (isJson) return JSON.parse(data)
  return data
}

const getReadFile = withTryCatchFinallyWrapper(getReadFileUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export { getReadFile, getReadFileUnsafe }
export type { GetReadFileParamsType, GetReadFileOptionsType, GetReadFileResType, GetReadFileType }
