import fs from 'node:fs'
import sharp from 'sharp'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'
import { getEnsuredDirectory } from '../getEnsuredDirectory'

type GetCroppedImageBySizeParamsType = {
  base64: string
  positionStartX: number
  positionStartY: number
  targetWidth: number
  targetHeight: number
  pathFileAbs: string
}

type GetCroppedImageBySizeOptionsType = { funcParent?: string }

type GetCroppedImageBySizeResType = unknown

type GetCroppedImageBySizeType = (
  params: GetCroppedImageBySizeParamsType,
  options?: GetCroppedImageBySizeOptionsType,
) => GetCroppedImageBySizeResType

const optionsDefault = {
  funcParent: 'getCroppedImageBySize',
} satisfies Required<GetCroppedImageBySizeOptionsType>

const resDefault: GetCroppedImageBySizeResType = ''

/**
 * @prompt Context: Unit tests typescript challenge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
          [
            {
              description: 'basic test getCroppedImageBySize',
              params: {},
              options: {},
              expected: '',
            },
          ]
 */

/**
 * @description Function to getCroppedImageBySize
 * @import import { getCroppedImageBySize } from './getCroppedImageBySize/getCroppedImageBySize'
 */
const getCroppedImageBySizeUnsafe: GetCroppedImageBySizeType = async (
  {
    base64,
    positionStartX,
    positionStartY,
    targetWidth,
    targetHeight,
    pathFileAbs,
  }: GetCroppedImageBySizeParamsType,
  options: GetCroppedImageBySizeOptionsType = optionsDefault,
) => {
  const imageBuffer = Buffer.from(base64, 'base64')

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

const getCroppedImageBySize = withTryCatchFinallyWrapper<
  GetCroppedImageBySizeParamsType,
  GetCroppedImageBySizeOptionsType,
  GetCroppedImageBySizeResType
>(getCroppedImageBySizeUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetCroppedImageBySizeCaseType = {
  description?: string
  params: Parameters<typeof getCroppedImageBySize>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getCroppedImageBySize>[1]
  expected: ReturnType<typeof getCroppedImageBySize>
}

export type {
  GetCroppedImageBySizeCaseType,
  GetCroppedImageBySizeOptionsType,
  GetCroppedImageBySizeParamsType,
  GetCroppedImageBySizeResType,
  GetCroppedImageBySizeType,
}
export { getCroppedImageBySize }
