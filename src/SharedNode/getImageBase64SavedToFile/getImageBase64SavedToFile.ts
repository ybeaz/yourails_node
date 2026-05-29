import { Buffer } from 'node:buffer'
import fs from 'fs'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'
import { getEnsuredDirectory } from '../getEnsuredDirectory'

type GetImageBase64SavedToFileParamsType = {
  imageBase64: string
  pathFileAbs: string
  format?: string
}

type GetImageBase64SavedToFileOptionsType = { funcParent?: string }

type GetImageBase64SavedToFileResType = { mediaType: string; finalPath: string }

type GetImageBase64SavedToFileType = (
  params: GetImageBase64SavedToFileParamsType,
  options?: GetImageBase64SavedToFileOptionsType,
) => Promise<GetImageBase64SavedToFileResType>

const optionsDefault = {
  funcParent: 'getImageBase64SavedToFile',
} satisfies Required<GetImageBase64SavedToFileOptionsType>

const resDefault: GetImageBase64SavedToFileResType = { mediaType: '', finalPath: '' }

/**
 * @prompt Context: Unit tests typescript challenge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
          [
            {
              description: 'basic test getImageBase64SavedToFile',
              params: {},
              options: {},
              expected: '',
            },
          ]
 */

/**
 * @description Function to transform and save image files from imageBase64
  ✅ string                      ...file.pngfile.png
  ✅ data:image/png;base64,      ...file.pngfile.png
  ✅ data:image/gif;base64,      ...file.pngfile.gif
  ✅ data:image/svg+xml;base64,  ...file.svgfile.svg
  ✅ data:application/pdf;base64,...file.pngfile.pdf
 * @import import { getImageBase64SavedToFile } from './getImageBase64SavedToFile/getImageBase64SavedToFile'
 */
const getImageBase64SavedToFileUnsafe: GetImageBase64SavedToFileType = async (
  { imageBase64, pathFileAbs, format = 'png' }: GetImageBase64SavedToFileParamsType,
  options: GetImageBase64SavedToFileOptionsType = optionsDefault,
) => {
  await getEnsuredDirectory({ path: pathFileAbs })

  /* Extract mediatype and data */
  const dataUrlMatch = imageBase64.match(/^data:([a-zA-Z]+\/[a-zA-Z0-9+\-.]+);base64,(.+)$/)

  let mediaType: string
  let ext: string

  if (dataUrlMatch) {
    const [, matchedMediaType] = dataUrlMatch
    mediaType = matchedMediaType
    ext = mediaType.split('/')[1].replace('+xml', '') // handles svg+xml → svg
  } else {
    mediaType = `application/${format}`
    ext = format?.replace(/^\.*/, '') || 'png'
  }

  /* Enforce correct extension */
  const finalPath = pathFileAbs.replace(/\.[^.]+$/, `.${ext}`)

  const buffer = Buffer.from(imageBase64, 'base64')
  fs.writeFileSync(finalPath, buffer)

  return { mediaType, finalPath }
}

const getImageBase64SavedToFile = withTryCatchFinallyWrapper<
  GetImageBase64SavedToFileParamsType,
  GetImageBase64SavedToFileOptionsType,
  GetImageBase64SavedToFileResType
>(getImageBase64SavedToFileUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetImageBase64SavedToFileCaseType = {
  description?: string
  params: Parameters<typeof getImageBase64SavedToFile>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getImageBase64SavedToFile>[1]
  expected: ReturnType<typeof getImageBase64SavedToFile>
}

export type {
  GetImageBase64SavedToFileCaseType,
  GetImageBase64SavedToFileOptionsType,
  GetImageBase64SavedToFileParamsType,
  GetImageBase64SavedToFileResType,
  GetImageBase64SavedToFileType,
}
export { getImageBase64SavedToFile }
