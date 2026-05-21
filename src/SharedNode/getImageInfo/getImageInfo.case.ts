import type { GetImageInfoCaseType } from './getImageInfo'

export const getImageInfoCases: GetImageInfoCaseType[] = [
  {
    description: 'basic test getImageInfo',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getImageInfo/__mocks__/s_0_2026-05-17-18-16-07_image.png',
    },
    options: {},
    expected: {
      width: 3072,
      height: 2056,
      dpiX: 72,
      dpiY: 72,
      resolutionUnit: undefined,
      format: 'png',
      channels: 3,
      hasAlpha: false,
      colorspace: 'srgb',
    },
  },
  {
    description: 'basic test getImageInfo',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getImageInfo/__mocks__/s_1_2026-05-17-18-16-18_image.png',
    },
    options: {},
    expected: {
      width: 1536,
      height: 1024,
      dpiX: 72,
      dpiY: 72,
      resolutionUnit: undefined,
      format: 'png',
      channels: 3,
      hasAlpha: false,
      colorspace: 'srgb',
    },
  },
]
