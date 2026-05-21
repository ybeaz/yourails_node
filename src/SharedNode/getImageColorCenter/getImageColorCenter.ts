import sharp from 'sharp'

import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'

type GetImageColorCenterParamsType = { pathFileAbs: string }

type GetImageColorCenterOptionsType = { funcParent?: string }

type GetImageColorCenterResType = { r: number; g: number; b: number; hex: string }

type GetImageColorCenterType = (
  params: GetImageColorCenterParamsType,
  options?: GetImageColorCenterOptionsType,
) => Promise<GetImageColorCenterResType>

const optionsDefault = {
  funcParent: 'getImageColorCenter',
} satisfies Required<GetImageColorCenterOptionsType>

const resDefault: GetImageColorCenterResType = { r: 0, g: 0, b: 0, hex: '' }

/**
 * @prompt Context: Unit tests typescript challenge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
          [
            {
              description: 'basic test getImageColorCenter',
              params: {},
              options: {},
              expected: '',
            },
          ]
 */

/**
 * @description Function to getImageColorCenter
 * @import import { getImageColorCenter } from './getImageColorCenter/getImageColorCenter'
 */
const getImageColorCenterUnsafe: GetImageColorCenterType = async (
  { pathFileAbs }: GetImageColorCenterParamsType,
  options: GetImageColorCenterOptionsType = optionsDefault,
) => {
  const image = sharp(pathFileAbs)
  const { width, height } = await image.metadata()

  const centerX = Math.floor(width / 2)
  const centerY = Math.floor(height / 2)

  const { data } = await image
    .extract({ left: centerX, top: centerY, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true })

  const [r, g, b] = data
  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`

  return { r, g, b, hex }
}

const getImageColorCenter = withTryCatchFinallyWrapper<
  GetImageColorCenterParamsType,
  GetImageColorCenterOptionsType,
  GetImageColorCenterResType
>(getImageColorCenterUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetImageColorCenterCaseType = {
  description?: string
  params: Parameters<typeof getImageColorCenter>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getImageColorCenter>[1]
  expected: ReturnType<typeof getImageColorCenter>
}

export type {
  GetImageColorCenterCaseType,
  GetImageColorCenterOptionsType,
  GetImageColorCenterParamsType,
  GetImageColorCenterResType,
  GetImageColorCenterType,
}
export { getImageColorCenter }
