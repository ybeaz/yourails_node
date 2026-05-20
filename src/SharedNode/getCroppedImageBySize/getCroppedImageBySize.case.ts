import { join } from 'node:path'
import { getImageToBase64 } from '../getImageToBase64/getImageToBase64'
import type { GetCroppedImageBySizeCaseType } from './getCroppedImageBySize'

export const CustomSizes = {
  LANDSCAPE_Y_HALF: { width: 1536, height: 512 },
  LANDSCAPE_X_HALF: { width: 768, height: 1024 },
  PORTRAIT_Y_HALF: { width: 1024, height: 768 },
} as const

type CustomSizeKey = keyof typeof CustomSizes

export const getCroppedImageBySizeCases: GetCroppedImageBySizeCaseType[] = [
  {
    description: 'basic test getCroppedImageBySize',
    params: {
      base64: getImageToBase64({
        pathFileAbs:
          '/Users/admin/Dev/yourails_node/src/SharedNode/getImageToBase64/__mocks__/s_1_2026-05-17-18-16-18_image.png',
      }) as string,
      positionStartX: 0,
      positionStartY: 0,
      targetWidth: 1536,
      targetHeight: 512,
      pathFileAbs: join(__dirname, '__output__/xxx.png'),
    },
    options: {},
    expected: '',
  },
]
