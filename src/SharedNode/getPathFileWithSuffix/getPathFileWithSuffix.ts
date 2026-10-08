import path from 'node:path'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           [
             {
               description: 'basic test getValidatedEntityLinksFilesReadable',
              params: {},
               options: {},
               expected: '',
             },
           ]
 */

type GetPathFileWithSuffixParamsType = { pathFileAbs: string; suffix: string }

type GetPathFileWithSuffixOptionsType = { separator?: string; funcParent?: string }

type GetPathFileWithSuffixResType = string

type GetPathFileWithSuffixType = (
  params: GetPathFileWithSuffixParamsType,
  options?: GetPathFileWithSuffixOptionsType,
) => GetPathFileWithSuffixResType

const optionsDefault = {
  separator: '',
  funcParent: 'getPathFileWithSuffix',
} satisfies Required<GetPathFileWithSuffixOptionsType>

const resDefault: GetPathFileWithSuffixResType = ''

/**
 * @description Function to getPathFileWithSuffix
 * @usage
   import { getPathFileWithSuffix, GetPathFileWithSuffixParamsType, GetPathFileWithSuffixOptionsType } from './getPathFileWithSuffix/getPathFileWithSuffix'
   const getPathFileWithSuffixParams: GetPathFileWithSuffixParamsType = {}
   const getPathFileWithSuffixOptions: GetPathFileWithSuffixOptionsType = {}
   getPathFileWithSuffix(getPathFileWithSuffixParams, getPathFileWithSuffixOptions)
*/
const getPathFileWithSuffixUnsafe: GetPathFileWithSuffixType = (
  { pathFileAbs, suffix }: GetPathFileWithSuffixParamsType,
  { separator = '' }: GetPathFileWithSuffixOptionsType = optionsDefault,
) => {
  const dir = path.dirname(pathFileAbs)
  const ext = path.extname(pathFileAbs)
  const stem = path.basename(pathFileAbs, ext)
  return path.join(dir, `${stem}${separator}${suffix}${ext}`)
}

const getPathFileWithSuffix = withTryCatchFinallyWrapper<
  GetPathFileWithSuffixParamsType,
  GetPathFileWithSuffixOptionsType,
  GetPathFileWithSuffixResType
>(getPathFileWithSuffixUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetPathFileWithSuffixCaseType = {
  description?: string
  params: Parameters<typeof getPathFileWithSuffix>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getPathFileWithSuffix>[1]
  expected: ReturnType<typeof getPathFileWithSuffix>
}

export type {
  GetPathFileWithSuffixCaseType,
  GetPathFileWithSuffixOptionsType,
  GetPathFileWithSuffixParamsType,
  GetPathFileWithSuffixResType,
  GetPathFileWithSuffixType,
}
export { getPathFileWithSuffix }
