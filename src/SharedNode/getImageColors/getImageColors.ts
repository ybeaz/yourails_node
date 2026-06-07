import sharp from 'sharp'

import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'

type GetImageColorsParamsType = { imageBase64?: string; pathFileAbs?: string }

type GetImageColorsOptionsType = { axisX?: number; axisY?: number; funcParent?: string }

type GetImageColorsDictType = { r: number; g: number; b: number; hex: string }

type GetImageColorsResType = Record<
  'CENTER' | 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT' | 'custom',
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
  CENTER: { r: 0, g: 0, b: 0, hex: '' },
  TOP_LEFT: { r: 0, g: 0, b: 0, hex: '' },
  TOP_RIGHT: { r: 0, g: 0, b: 0, hex: '' },
  BOTTOM_LEFT: { r: 0, g: 0, b: 0, hex: '' },
  BOTTOM_RIGHT: { r: 0, g: 0, b: 0, hex: '' },
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
  { imageBase64, pathFileAbs }: GetImageColorsParamsType,
  { axisX = 0, axisY = 0 }: GetImageColorsOptionsType = optionsDefault,
) => {
  if (!imageBase64 && !pathFileAbs)
    throw Error('getImageColors [60]. There is neither imageBase64, no pathFileAbs')

  let input: string | Buffer<ArrayBuffer> = pathFileAbs || imageBase64 || ''

  if (imageBase64) {
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '')
    input = Buffer.from(base64Data, 'base64')
  }

  const image = sharp(input)
  const { width, height } = await image.metadata()

  const centerX = Math.floor(width / 2)
  const centerY = Math.floor(height / 2)
  const quarterW = Math.floor(width / 4)
  const quarterH = Math.floor(height / 4)

  const getPixelColor = async (left: number, top: number): Promise<GetImageColorsDictType> => {
    const { data } = await sharp(input)
      .extract({ left, top, width: 1, height: 1 })
      .raw()
      .toBuffer({ resolveWithObject: true })

    const [r, g, b] = data
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`

    return { r, g, b, hex }
  }

  const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), max - 1)

  const [CENTER, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT, custom] = await Promise.all([
    getPixelColor(centerX, centerY), // Image center
    getPixelColor(quarterW, quarterH), // Top-left quarter center
    getPixelColor(centerX + quarterW, quarterH), // Top-right quarter center
    getPixelColor(quarterW, centerY + quarterH), // Bottom-left quarter center
    getPixelColor(centerX + quarterW, centerY + quarterH), // Bottom-right quarter center
    getPixelColor(clamp(axisX, width), clamp(axisY, height)), // Custom coordinates
  ])

  return {
    CENTER,
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
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
