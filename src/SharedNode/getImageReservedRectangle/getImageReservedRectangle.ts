import fs from 'node:fs'
import sharp from 'sharp'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'
import { getEnsuredDirectory } from '../getEnsuredDirectory'

const createRoundedMask = (width: number, height: number, radius: number): Buffer => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>
  `
  return Buffer.from(svg)
}

type GetImageReservedRectangleParamsType = {
  imageBase64: string
  positionStartX: number /* pixel X origin of the reserved rect */
  positionStartY: number /* pixel Y origin of the reserved rect */
  targetWidth: number /* pixel width of the reserved rect */
  targetHeight: number /* pixel height of the reserved rect */
  pathFileAbs: string /* absolute path to write the output file */
}

type GetImageReservedRectangleOptionsType = {
  blurSigma?: number
  opacity?: number
  lightenColor?: [number, number, number]
  borderRadius?: number
  funcParent?: string
}

type GetImageReservedRectangleResType = string

type GetImageReservedRectangleType = (
  params: GetImageReservedRectangleParamsType,
  options?: GetImageReservedRectangleOptionsType,
) => Promise<GetImageReservedRectangleResType>

const optionsDefault = {
  blurSigma: 18,
  opacity: 0.85,
  lightenColor: [255, 255, 255] as [number, number, number],
  borderRadius: 0,
  funcParent: 'getImageReservedRectangle',
} satisfies Required<GetImageReservedRectangleOptionsType>

const resDefault: GetImageReservedRectangleResType = ''

/**
 * @prompt Context: Unit tests typescript challenge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
          [
            {
              description: 'basic test getImageReservedRectangle',
              params: {},
              options: {},
              expected: '',
            },
          ]
 */

/**
 * @description Applies an atmospheric blur+lighten mask over a reserved rectangle
 *              region of a base64 image, then writes the result to pathFileAbs.
 *              Returns pathFileAbs on success, empty string on failure.
 * @import import { getImageReservedRectangle } from './getImageReservedRectangle/getImageReservedRectangle'
 */
const getImageReservedRectangleUnsafe: GetImageReservedRectangleType = async (
  {
    imageBase64,
    positionStartX,
    positionStartY,
    targetWidth,
    targetHeight,
    pathFileAbs,
  }: GetImageReservedRectangleParamsType,
  options: GetImageReservedRectangleOptionsType = optionsDefault,
) => {
  const {
    blurSigma = optionsDefault.blurSigma,
    opacity = optionsDefault.opacity,
    lightenColor = optionsDefault.lightenColor,
  } = options

  // ── 1. Decode base64 → Buffer ──
  const inputBuffer = Buffer.from(imageBase64, 'base64')

  // ── 2. Extract the reserved region and blur it ──
  const regionBuffer = await sharp(inputBuffer)
    .extract({
      left: positionStartX,
      top: positionStartY,
      width: targetWidth,
      height: targetHeight,
    })
    .blur(blurSigma)
    .png()
    .toBuffer()

  // ── 3. Build a semi-transparent lighten overlay ──
  const [r, g, b] = lightenColor
  const alpha = Math.round(opacity * 255)
  const overlayPixels = new Uint8ClampedArray(targetWidth * targetHeight * 4)

  for (let i = 0; i < targetWidth * targetHeight; i++) {
    overlayPixels[i * 4 + 0] = r
    overlayPixels[i * 4 + 1] = g
    overlayPixels[i * 4 + 2] = b
    overlayPixels[i * 4 + 3] = alpha
  }

  const lightenOverlay = await sharp(Buffer.from(overlayPixels.buffer), {
    raw: { width: targetWidth, height: targetHeight, channels: 4 },
  })
    .png()
    .toBuffer()

  // ── 4. Composite lighten layer onto the blurred region, then apply rounded mask ──
  const roundedRadius = options.borderRadius ?? 0

  const roundedMask = createRoundedMask(targetWidth, targetHeight, roundedRadius)

  const maskedRegion = await sharp(regionBuffer)
    .composite([{ input: lightenOverlay, blend: 'over' }])
    .png()
    .toBuffer()

  const maskedRegionRounded = await sharp(maskedRegion)
    .composite([
      {
        input: roundedMask,
        blend: 'dest-in', // ← keeps only pixels where mask is white
      },
    ])
    .png()
    .toBuffer()

  // const maskedRegion = await sharp(regionBuffer)
  //   .composite([{ input: lightenOverlay, blend: 'over' }])
  //   .png()
  //   .toBuffer()

  // ── 5. Composite masked region back onto the original image ──
  const buffer = await sharp(inputBuffer)
    .composite([
      {
        input: maskedRegionRounded,
        left: positionStartX,
        top: positionStartY,
        blend: 'over',
      },
    ])
    .png()
    .toBuffer()

  if (pathFileAbs) {
    await getEnsuredDirectory({ path: pathFileAbs })
    await fs.promises.writeFile(pathFileAbs, buffer)
  }
  return buffer.toString('base64')
}

const getImageReservedRectangle = withTryCatchFinallyWrapper<
  GetImageReservedRectangleParamsType,
  GetImageReservedRectangleOptionsType,
  GetImageReservedRectangleResType
>(getImageReservedRectangleUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetImageReservedRectangleCaseType = {
  description?: string
  params: Parameters<typeof getImageReservedRectangle>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getImageReservedRectangle>[1]
  expected: ReturnType<typeof getImageReservedRectangle>
}

export type {
  GetImageReservedRectangleCaseType,
  GetImageReservedRectangleOptionsType,
  GetImageReservedRectangleParamsType,
  GetImageReservedRectangleResType,
  GetImageReservedRectangleType,
}
export { getImageReservedRectangle }
