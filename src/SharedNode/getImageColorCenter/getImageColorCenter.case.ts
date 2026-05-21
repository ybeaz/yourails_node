import type { GetImageColorCenterCaseType } from './getImageColorCenter'

export const getImageColorCenterCases: GetImageColorCenterCaseType[] = [
  {
    description: 'basic test getImageColorCenter',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getImageColorCenter/__mocks__/s_3_2026-05-17-11-22-02_image.png',
    },
    options: {},
    expected: { r: 253, g: 241, b: 219, hex: '#fdf1db' },
  },
]
