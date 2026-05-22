import fs from 'node:fs'
import sharp from 'sharp'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'
import { getEnsuredDirectory } from '../getEnsuredDirectory'

type GetImageCroppedBySizeParamsType = {
  imageBase64: string
  positionStartX: number
  positionStartY: number
  targetWidth: number
  targetHeight: number
  pathFileAbs: string
}

type GetImageCroppedBySizeOptionsType = { funcParent?: string }

type GetImageCroppedBySizeResType = unknown

type GetImageCroppedBySizeType = (
  params: GetImageCroppedBySizeParamsType,
  options?: GetImageCroppedBySizeOptionsType,
) => GetImageCroppedBySizeResType

const optionsDefault = {
  funcParent: 'getImageCroppedBySize',
} satisfies Required<GetImageCroppedBySizeOptionsType>

const resDefault: GetImageCroppedBySizeResType = ''

/**
 * @prompt Context: Unit tests typescript challenge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
          [
            {
              description: 'basic test getImageCroppedBySize',
              params: {},
              options: {},
              expected: '',
            },
          ]
 */

/**
 * @description Function to getImageCroppedBySize
 * @import import { getImageCroppedBySize } from './getImageCroppedBySize/getImageCroppedBySize'
 */
const getImageCroppedBySizeUnsafe: GetImageCroppedBySizeType = async (
  {
    imageBase64,
    positionStartX,
    positionStartY,
    targetWidth,
    targetHeight,
    pathFileAbs,
  }: GetImageCroppedBySizeParamsType,
  options: GetImageCroppedBySizeOptionsType = optionsDefault,
) => {
  const imageBuffer = Buffer.from(imageBase64, 'base64')

  const buffer = await sharp(imageBuffer)
    .extract({
      left: positionStartX,
      top: positionStartY,
      width: targetWidth,
      height: targetHeight,
    })
    .png()
    .toBuffer()

  await getEnsuredDirectory({ path: pathFileAbs })
  await fs.promises.writeFile(pathFileAbs, buffer)

  return buffer.toString('base64')
}

const getImageCroppedBySize = withTryCatchFinallyWrapper<
  GetImageCroppedBySizeParamsType,
  GetImageCroppedBySizeOptionsType,
  GetImageCroppedBySizeResType
>(getImageCroppedBySizeUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetImageCroppedBySizeCaseType = {
  description?: string
  params: Parameters<typeof getImageCroppedBySize>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getImageCroppedBySize>[1]
  expected: ReturnType<typeof getImageCroppedBySize>
}

export type {
  GetImageCroppedBySizeCaseType,
  GetImageCroppedBySizeOptionsType,
  GetImageCroppedBySizeParamsType,
  GetImageCroppedBySizeResType,
  GetImageCroppedBySizeType,
}
export { getImageCroppedBySize }
