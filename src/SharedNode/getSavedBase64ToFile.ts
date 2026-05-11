import fs from 'fs'
import { Buffer } from 'buffer'

export type GetSavedBase64ToFileParamsType = {
  b64String: string
  pathFile: string
  format?: string
}

export interface GetSavedBase64ToFileType {
  (params: GetSavedBase64ToFileParamsType): { mediaType: string; finalPath: string }
}

/**
 * @description Function to transform and save image files from b64String
  ✅ string                      ...file.pngfile.png
  ✅ data:image/png;base64,      ...file.pngfile.png
  ✅ data:image/gif;base64,      ...file.pngfile.gif
  ✅ data:image/svg+xml;base64,  ...file.svgfile.svg
  ✅ data:application/pdf;base64,...file.pngfile.pdf
 */
export const getSavedBase64ToFile: GetSavedBase64ToFileType = ({
  b64String,
  pathFile,
  format = 'png',
}: GetSavedBase64ToFileParamsType) => {
  /* Extract mediatype and data */
  const dataUrlMatch = b64String.match(/^data:([a-zA-Z]+\/[a-zA-Z0-9+\-.]+);base64,(.+)$/)

  let mediaType: string
  let base64Data: string
  let ext: string

  if (dataUrlMatch) {
    const [, matchedMediaType, matchedBase64Data] = dataUrlMatch
    mediaType = matchedMediaType
    base64Data = matchedBase64Data
    ext = mediaType.split('/')[1].replace('+xml', '') // handles svg+xml → svg
  } else {
    mediaType = `application/${format}`
    base64Data = b64String.replace(/\s+/g, '')
    ext = format?.replace(/^\.*/, '') || 'png'
  }

  /* Enforce correct extension */
  const finalPath = pathFile.replace(/\.[^.]+$/, `.${ext}`)

  const buffer = Buffer.from(base64Data, 'base64')
  fs.writeFileSync(finalPath, buffer)

  return { mediaType, finalPath } /* useful for caller to know what was saved */
}
