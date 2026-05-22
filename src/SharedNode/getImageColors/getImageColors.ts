import sharp from 'sharp'

import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'

type GetImageColorsParamsType = { pathFileAbs: string }

type GetImageColorsOptionsType = { axisX?: number; axisY?: number; funcParent?: string }

type GetImageColorsDictType = { r: number; g: number; b: number; hex: string }

type GetImageColorsResType = Record<
  | 'center'
  | 'topLeftQuaterCenter'
  | 'topRightQuaterCenter'
  | 'bottomLeftQuaterCenter'
  | 'bottomRightQuaterCenter'
  | 'custom',
  GetImageColorsDictType
>

type GetImageColorsType = (
  params: GetImageColorsParamsType,
  options?: GetImageColorsOptionsType,
) => Promise<GetImageColorsResType>

const optionsDefault = {
  axisX: 0,
  axisY: 0,
  funcParent: 'getImageColors',
} satisfies Required<GetImageColorsOptionsType>

const resDefault: GetImageColorsResType = {
  center: { r: 0, g: 0, b: 0, hex: '' },
  topLeftQuaterCenter: { r: 0, g: 0, b: 0, hex: '' },
  topRightQuaterCenter: { r: 0, g: 0, b: 0, hex: '' },
  bottomLeftQuaterCenter: { r: 0, g: 0, b: 0, hex: '' },
  bottomRightQuaterCenter: { r: 0, g: 0, b: 0, hex: '' },
  custom: { r: 0, g: 0, b: 0, hex: '' },
}

/**
 * @prompt Context: Unit tests typescript challenge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
          [
            {
              description: 'basic test getImageColors',
              params: {},
              options: {},
              expected: '',
            },
          ]
 */

/**
 * @description Function to getImageColors
 * @import import { getImageColors } from './getImageColors/getImageColors'
 */
const getImageColorsUnsafe: GetImageColorsType = async (
  { pathFileAbs }: GetImageColorsParamsType,
  { axisX = 0, axisY = 0 }: GetImageColorsOptionsType = optionsDefault,
) => {
  const image = sharp(pathFileAbs)
  const { width, height } = await image.metadata()

  const centerX = Math.floor(width / 2)
  const centerY = Math.floor(height / 2)
  const quarterW = Math.floor(width / 4)
  const quarterH = Math.floor(height / 4)

  const getPixelColor = async (left: number, top: number): Promise<GetImageColorsDictType> => {
    const { data } = await sharp(pathFileAbs)
      .extract({ left, top, width: 1, height: 1 })
      .raw()
      .toBuffer({ resolveWithObject: true })

    const [r, g, b] = data
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`

    return { r, g, b, hex }
  }

  const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), max - 1)

  const [
    center,
    topLeftQuaterCenter,
    topRightQuaterCenter,
    bottomLeftQuaterCenter,
    bottomRightQuaterCenter,
    custom,
  ] = await Promise.all([
    getPixelColor(centerX, centerY), // Image center
    getPixelColor(quarterW, quarterH), // Top-left quarter center
    getPixelColor(centerX + quarterW, quarterH), // Top-right quarter center
    getPixelColor(quarterW, centerY + quarterH), // Bottom-left quarter center
    getPixelColor(centerX + quarterW, centerY + quarterH), // Bottom-right quarter center
    getPixelColor(clamp(axisX, width), clamp(axisY, height)), // Custom coordinates
  ])

  return {
    center,
    topLeftQuaterCenter,
    topRightQuaterCenter,
    bottomLeftQuaterCenter,
    bottomRightQuaterCenter,
    custom,
  }
}

const getImageColors = withTryCatchFinallyWrapper<
  GetImageColorsParamsType,
  GetImageColorsOptionsType,
  GetImageColorsResType
>(getImageColorsUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetImageColorsCaseType = {
  description?: string
  params: Parameters<typeof getImageColors>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getImageColors>[1]
  expected: ReturnType<typeof getImageColors>
}

export type {
  GetImageColorsCaseType,
  GetImageColorsOptionsType,
  GetImageColorsParamsType,
  GetImageColorsResType,
  GetImageColorsType,
}
export { getImageColors }
