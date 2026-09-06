import type {
  GetCompressedImagePngCaseType,
  GetCompressedImagePngParamsType,
} from './getCompressedImagePng'

export const getCompressedImagePngCases: GetCompressedImagePngCaseType[] = [
  {
    description: 'basic test getCompressedImagePng',
    params: {} as GetCompressedImagePngParamsType,
    options: {},
    expected: { pathFileAbsOutput: '', imageBase64: '' },
  },
]
