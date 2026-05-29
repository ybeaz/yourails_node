import type { GetImageBase64SavedToFileCaseType } from './getImageBase64SavedToFile'

export const getImageBase64SavedToFileCases: GetImageBase64SavedToFileCaseType[] = [
  {
    description: 'basic test getImageBase64SavedToFile',
    params: { imageBase64: '', pathFileAbs: '', format: 'png' },
    options: {},
    expected: { mediaType: '', finalPath: '' },
  },
]
