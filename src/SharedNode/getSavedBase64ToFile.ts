import { Buffer } from 'buffer'
import fs from 'fs'
import { getEnsuredDirectory } from './getEnsuredDirectory'

export type GetSavedBase64ToFileParamsType = {
  imageBase64: string
  pathFileAbs: string
  format?: string
}

export type GetSavedBase64ToFileType = (
  params: GetSavedBase64ToFileParamsType,
) => Promise<{ mediaType: string; finalPath: string }>

/**
 * @description Function to transform and save image files from imageBase64
  ✅ string                      ...file.pngfile.png
  ✅ data:image/png;base64,      ...file.pngfile.png
  ✅ data:image/gif;base64,      ...file.pngfile.gif
  ✅ data:image/svg+xml;base64,  ...file.svgfile.svg
  ✅ data:application/pdf;base64,...file.pngfile.pdf
 */
export const getSavedBase64ToFile: GetSavedBase64ToFileType = async ({
  imageBase64,
  pathFileAbs,
  format = 'png',
}: GetSavedBase64ToFileParamsType) => {
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

  return { mediaType, finalPath } /* useful for caller to know what was saved */
}
