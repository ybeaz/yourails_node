import { AREA_RECTANGLE_DICT } from 'yourails_common'
import { getImageToBase64 } from '../getImageToBase64/getImageToBase64'
import type { GetImageReservedRectangleCaseType } from './getImageReservedRectangle'

const imageBase64: string = getImageToBase64({
  pathFileAbs:
    '/Users/admin/Dev/__output__/2026-05-17-10-59-44-Exploring-rust-a-modern-programming-language/s_1_2026-05-17-11-21-21_image.png',
}) as string

export const getImageReservedRectangleCases: GetImageReservedRectangleCaseType[] = [
  {
    description: 'real case test getImageReservedRectangle',
    params: {
      imageBase64,
      ...AREA_RECTANGLE_DICT.LANDSCAPE['BOTTOM_RIGHT'],
      pathFileAbs: '',
    },
    options: { blurSigma: 9, opacity: 0.67, lightenColor: [228, 236, 243], borderRadius: 24 },
    expected: '',
  },
  // {
  //   description: 'basic test getImageReservedRectangle',
  //   params: {
  //     imageBase64: getImageToBase64({
  //       pathFileAbs:
  //         '/Users/admin/Dev/yourails_node/src/SharedNode/getImageReservedRectangle/__mocks__/s_1_2026-05-17-18-16-18_image.png',
  //     }) as string,
  //     ...AREA_RECTANGLE_DICT.LANDSCAPE.TOP_RIGHT,
  //     pathFileAbs:
  //       '/Users/admin/Dev/yourails_node/src/SharedNode/getImageReservedRectangle/__output__/s_1_2026-05-17-18-16-18_image.png',
  //   },
  //   options: { borderRadius: 16 },
  //   expected: '',
  // },
]
