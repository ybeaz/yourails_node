import type { GetImageColorsCaseType } from './getImageColors'

export const getImageColorsCases: GetImageColorsCaseType[] = [
  {
    description: 'basic test getImageColors',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getImageColors/__mocks__/s_3_2026-05-17-11-22-02_image.png',
    },
    options: {},
    expected: {
      center: { r: 253, g: 241, b: 219, hex: '#fdf1db' },
      topLeftQuaterCenter: { r: 251, g: 233, b: 199, hex: '#fbe9c7' },
      topRightQuaterCenter: { r: 250, g: 232, b: 198, hex: '#fae8c6' },
      bottomLeftQuaterCenter: { r: 70, g: 57, b: 52, hex: '#463934' },
      bottomRightQuaterCenter: { r: 52, g: 39, b: 28, hex: '#34271c' },
      custom: { r: 254, g: 245, b: 232, hex: '#fef5e8' },
    },
  },
]
