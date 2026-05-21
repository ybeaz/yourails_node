import { join } from 'node:path'
import { ImageSizesStandardEnum } from 'yourails_common'
import { getImageToBase64 } from '../getImageToBase64/getImageToBase64'
import type { GetImageCroppedBySizeCaseType } from './getImageCroppedBySize'

export const getImageCroppedBySizeCases: GetImageCroppedBySizeCaseType[] = [
  {
    description: 'basic test getImageCroppedBySize',
    params: {
      base64: getImageToBase64({
        pathFileAbs:
          '/Users/admin/Dev/yourails_node/src/SharedNode/getImageToBase64/__mocks__/s_1_2026-05-17-18-16-18_image.png',
      }) as string,
      positionStartX: 0,
      positionStartY: 0,
      targetWidth: ImageSizesStandardEnum.LANDSCAPE_WIDTH,
      targetHeight: ImageSizesStandardEnum.LANDSCAPE_HEIGHT_HALF,
      pathFileAbs: join(__dirname, '__output__/xxx.png'),
    },
    options: {},
    expected: '',
  },
]
