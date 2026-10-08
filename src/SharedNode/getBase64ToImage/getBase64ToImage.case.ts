import { FileTypeEnum } from 'yourails_common'
import type { GetBase64ToImageCaseType } from './getBase64ToImage'

export const getBase64ToImageCases: GetBase64ToImageCaseType[] = [
  {
    description: 'basic test getBase64ToImage',
    params: { imageBase64: '', pathFileAbs: '' },
    options: { fileType: FileTypeEnum.png },
    expected: { mediaType: '', data: '', pathFileAbsOutput: '' },
  },
]
