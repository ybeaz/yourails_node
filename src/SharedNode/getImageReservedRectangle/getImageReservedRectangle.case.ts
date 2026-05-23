import { ImageSizesStandardEnum } from 'yourails_common'
import { getImageToBase64 } from '../getImageToBase64/getImageToBase64'
import type { GetImageReservedRectangleCaseType } from './getImageReservedRectangle'

export const getImageReservedRectangleCases: GetImageReservedRectangleCaseType[] = [
  {
    description: 'basic test getImageReservedRectangle',
    params: {
      imageBase64: getImageToBase64({
        pathFileAbs:
          '/Users/admin/Dev/yourails_node/src/SharedNode/getImageReservedRectangle/__mocks__/s_1_2026-05-17-18-16-18_image.png',
      }) as string,
      positionStartX: 0,
      positionStartY: 0,
      targetWidth: ImageSizesStandardEnum.LANDSCAPE_WIDTH_HALF,
      targetHeight: ImageSizesStandardEnum.LANDSCAPE_HEIGHT_HALF,
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getImageReservedRectangle/__output__/s_1_2026-05-17-18-16-18_image.png',
    },
    options: {},
    expected: '',
  },
]
