import { Buffer } from 'node:buffer'
import fs from 'fs'
import { FileTypeEnum, FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'
import { getEnsuredDirectory } from '../getEnsuredDirectory'

type GetBase64ToImageParamsType = {
  imageBase64: string
  pathFileAbs?: string
  pathFileAbsOutput?: string
}

type GetBase64ToImageOptionsType = {
  fileType?: FileTypeEnum.png | FileTypeEnum.jpeg
  funcParent?: string
}

type GetBase64ToImageResType = { mediaType: string; pathFileAbsOutput: string }

type GetBase64ToImageType = (
  params: GetBase64ToImageParamsType,
  options?: GetBase64ToImageOptionsType,
) => Promise<GetBase64ToImageResType>

const optionsDefault = {
  funcParent: 'getBase64ToImage',
  fileType: FileTypeEnum.png,
} satisfies Required<GetBase64ToImageOptionsType>

const resDefault: GetBase64ToImageResType = { mediaType: '', pathFileAbsOutput: '' }

/**
 * @prompt Context: Unit tests typescript challenge
 *         Question: Suggest unit test data to test the function with the description below
 *         fileType: Follow the fileType of the array of test-objects below
          [
            {
              description: 'basic test getBase64ToImage',
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
  @usage
   import { getBase64ToImage, GetBase64ToImageParamsType, GetBase64ToImageOptionsType } from './getBase64ToImage/getBase64ToImage'
   const getBase64ToImageParams: GetBase64ToImageParamsType = {}
   const getBase64ToImageOptions: GetBase64ToImageOptionsType = {}
   getBase64ToImage(getBase64ToImageParams, getBase64ToImageOptions)
 */
const getBase64ToImageUnsafe: GetBase64ToImageType = async (
  {
    imageBase64: imageBase64In,
    pathFileAbs = '',
    pathFileAbsOutput: pathFileAbsOutputIn,
  }: GetBase64ToImageParamsType,
  options: GetBase64ToImageOptionsType = optionsDefault,
) => {
  await getEnsuredDirectory({ path: pathFileAbsOutputIn || pathFileAbs })

  const dataUrlMatch = imageBase64In.match(/^data:([a-zA-Z]+\/[a-zA-Z0-9+\-.]+);base64,([\s\S]+)$/)

  let mediaType: string
  let ext: string
  let imageBase64 = imageBase64In

  const EXT_BY_MEDIA_TYPE: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'application/pdf': 'pdf',
  }

  if (dataUrlMatch) {
    const [, matchedMediaType, payload] = dataUrlMatch

    mediaType = matchedMediaType
    imageBase64 = payload

    ext = EXT_BY_MEDIA_TYPE[mediaType] || options.fileType?.replace(/^\.*/, '') || ''
  } else {
    mediaType = `application/${options.fileType}`
    ext = options.fileType?.replace(/^\.*/, '') || ''
  }

  if (!imageBase64.trim()) {
    throw new Error('Empty base64 payload')
  }

  const MAX_BASE64_SIZE = 50 * 1024 * 1024

  if (imageBase64.length > MAX_BASE64_SIZE) {
    throw new Error('Base64 payload too large')
  }

  const pathFileAbsOutput = pathFileAbsOutputIn
    ? pathFileAbsOutputIn
    : /\.[^.]+$/.test(pathFileAbs)
      ? pathFileAbs?.replace(/\.[^.]+$/, `.${ext}`)
      : `${pathFileAbs}.${ext}`

  let buffer: Buffer | undefined

  try {
    buffer = Buffer.from(imageBase64, 'base64')

    if (!buffer.length) {
      throw new Error('Decoded buffer is empty')
    }

    await fs.promises.writeFile(pathFileAbsOutput, buffer)
  } finally {
    imageBase64 = ''
    buffer = undefined
  }

  return { mediaType, pathFileAbsOutput }
}

const getBase64ToImage = withTryCatchFinallyWrapper<
  GetBase64ToImageParamsType,
  GetBase64ToImageOptionsType,
  GetBase64ToImageResType
>(getBase64ToImageUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetBase64ToImageCaseType = {
  description?: string
  params: Parameters<typeof getBase64ToImage>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getBase64ToImage>[1]
  expected: ReturnType<typeof getBase64ToImage>
}

export type {
  GetBase64ToImageCaseType,
  GetBase64ToImageOptionsType,
  GetBase64ToImageParamsType,
  GetBase64ToImageResType,
  GetBase64ToImageType,
}
export { getBase64ToImage }
