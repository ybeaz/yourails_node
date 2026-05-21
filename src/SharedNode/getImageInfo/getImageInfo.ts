import sharp from 'sharp'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'

type GetImageInfoParamsType = { pathFileAbs: string }

type GetImageInfoOptionsType = { funcParent?: string }

type GetImageInfoResType = {
  width: number
  height: number
  dpiX: undefined | number
  dpiY: undefined | number
  resolutionUnit: undefined | string
  format: string
  channels: number
  hasAlpha: boolean
  colorspace: string
}

type GetImageInfoType = (
  params: GetImageInfoParamsType,
  options?: GetImageInfoOptionsType,
) => Promise<GetImageInfoResType>

const optionsDefault = {
  funcParent: 'getImageInfo',
} satisfies Required<GetImageInfoOptionsType>

const resDefault: GetImageInfoResType = {
  width: 0,
  height: 0,
  dpiX: 0,
  dpiY: 0,
  resolutionUnit: undefined,
  format: '',
  channels: 0,
  hasAlpha: false,
  colorspace: '',
}

/**
 * @prompt Context: Unit tests typescript challenge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
          [
            {
              description: 'basic test getImageInfo',
              params: {},
              options: {},
              expected: '',
            },
          ]
 */

/**
 * @description Function to getImageInfo
 * @import import { getImageInfo } from './getImageInfo/getImageInfo'
 */
const getImageInfoUnsafe: GetImageInfoType = async (
  { pathFileAbs }: GetImageInfoParamsType,
  options: GetImageInfoOptionsType = optionsDefault,
) => {
  const metadata = await sharp(pathFileAbs).metadata()

  return {
    // Dimensions
    width: metadata.width, // pixels
    height: metadata.height, // pixels

    // Resolution (DPI)
    dpiX: metadata.density, // horizontal DPI
    dpiY: metadata.density, // Sharp exposes one density value for both axes
    resolutionUnit: metadata.resolutionUnit, // 'inch' | 'cm' | undefined

    // Extras
    format: metadata.format, // 'jpeg' | 'png' | 'webp' etc.
    channels: metadata.channels, // 3 = RGB, 4 = RGBA
    hasAlpha: metadata.hasAlpha,
    colorspace: metadata.space, // 'srgb' | 'cmyk' etc.
  }
}

const getImageInfo = withTryCatchFinallyWrapper<
  GetImageInfoParamsType,
  GetImageInfoOptionsType,
  GetImageInfoResType
>(getImageInfoUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetImageInfoCaseType = {
  description?: string
  params: Parameters<typeof getImageInfo>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getImageInfo>[1]
  expected: ReturnType<typeof getImageInfo>
}

export type {
  GetImageInfoCaseType,
  GetImageInfoOptionsType,
  GetImageInfoParamsType,
  GetImageInfoResType,
  GetImageInfoType,
}
export { getImageInfo }
