import fs from 'node:fs'
import path from 'node:path'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'

type GetImageToBase64ParamsType = {
  pathFileAbs: string
}

type GetImageToBase64OptionsType = { funcParent?: string }

type GetImageToBase64ResType = string

type GetImageToBase64Type = (
  params: GetImageToBase64ParamsType,
  options?: GetImageToBase64OptionsType,
) => GetImageToBase64ResType

const optionsDefault = {
  funcParent: 'getImageToBase64',
} satisfies Required<GetImageToBase64OptionsType>

const resDefault: GetImageToBase64ResType = ''

/**
 * @prompt Context: Unit tests typescript challenge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
          [
            {
              description: 'basic test getImageToBase64',
              params: {},
              options: {},
              expected: '',
            },
          ]
 */

/**
 * @description Function to getImageToBase64
 * @import import { getImageToBase64 } from './getImageToBase64/getImageToBase64'
 */
const getImageToBase64Unsafe: GetImageToBase64Type = (
  { pathFileAbs }: GetImageToBase64ParamsType,
  options: GetImageToBase64OptionsType = optionsDefault,
) => {
  return fs.readFileSync(path.resolve(pathFileAbs)).toString('base64')
}

const getImageToBase64 = withTryCatchFinallyWrapper<
  GetImageToBase64ParamsType,
  GetImageToBase64OptionsType,
  GetImageToBase64ResType
>(getImageToBase64Unsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetImageToBase64CaseType = {
  description?: string
  params: Parameters<typeof getImageToBase64>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getImageToBase64>[1]
  expected: ReturnType<typeof getImageToBase64>
}

export type {
  GetImageToBase64CaseType,
  GetImageToBase64OptionsType,
  GetImageToBase64ParamsType,
  GetImageToBase64ResType,
  GetImageToBase64Type,
}
export { getImageToBase64 }
