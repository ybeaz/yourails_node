import { getSpawnedProcess } from '../getSpawnedProcess/getSpawnedProcess'

export async function getCheckedMagick() {
  try {
    await getSpawnedProcess({ cmd: 'magick', args: ['-version'] }, { isQuiet: true })
  } catch (e) {
    throw new Error('ImageMagick (magick) is not installed or not in PATH')
  }
}
