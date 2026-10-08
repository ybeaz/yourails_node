import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'
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

type GetCompressedImagePngParamsType = {
  base64Input?: string
  pathFileAbsInput?: string
  pathFileAbsOutput: string
}

type GetCompressedImagePngOptionsType = { funcParent?: string }

type GetCompressedImagePngResType = { pathFileAbsOutput: string; imageBase64: string }

type GetCompressedImagePngType = (
  params: GetCompressedImagePngParamsType,
  options?: GetCompressedImagePngOptionsType,
) => Promise<GetCompressedImagePngResType>

const optionsDefault = {
  funcParent: 'getCompressedImagePng',
} satisfies Required<GetCompressedImagePngOptionsType>

const resDefault: GetCompressedImagePngResType = { pathFileAbsOutput: '', imageBase64: '' }

/**
 * @description Function to getCompressedImagePng
 * @usage
   import { getCompressedImagePng, GetCompressedImagePngParamsType, GetCompressedImagePngOptionsType } from './getCompressedImagePng/getCompressedImagePng'
   const getCompressedImagePngParams: GetCompressedImagePngParamsType = {}
   const getCompressedImagePngOptions: GetCompressedImagePngOptionsType = {}
   getCompressedImagePng(getCompressedImagePngParams, getCompressedImagePngOptions)
*/
const getCompressedImagePngUnsafe: GetCompressedImagePngType = async (
  { base64Input, pathFileAbsInput, pathFileAbsOutput }: GetCompressedImagePngParamsType,
  options: GetCompressedImagePngOptionsType = optionsDefault,
) => {
  let outputBuffer: Buffer<ArrayBufferLike> | undefined

  if (base64Input) {
    const clean = base64Input.replace(/^data:image\/\w+;base64,/, '')
    const inputBuffer = Buffer.from(clean, 'base64')

    outputBuffer = await sharp(inputBuffer)
      .png({ palette: true, colors: 128, compressionLevel: 9, effort: 10 })
      .toBuffer()
  } else if (pathFileAbsInput) {
    outputBuffer = await sharp(pathFileAbsInput)
      .png({
        compressionLevel: 9,
        palette: true,
        quality: 80,
        colors: 128,
        effort: 10,
        dither: 1.0,
      })
      .toBuffer()
  }

  if (outputBuffer) await writeFile(pathFileAbsOutput, outputBuffer)

  return { pathFileAbsOutput, imageBase64: outputBuffer?.toString() || '' }
}

const getCompressedImagePng = withTryCatchFinallyWrapper<
  GetCompressedImagePngParamsType,
  GetCompressedImagePngOptionsType,
  GetCompressedImagePngResType
>(getCompressedImagePngUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetCompressedImagePngCaseType = {
  description?: string
  params: Parameters<typeof getCompressedImagePng>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getCompressedImagePng>[1]
  expected: ReturnType<typeof getCompressedImagePng>
}

export type {
  GetCompressedImagePngCaseType,
  GetCompressedImagePngOptionsType,
  GetCompressedImagePngParamsType,
  GetCompressedImagePngResType,
  GetCompressedImagePngType,
}
export { getCompressedImagePng }
