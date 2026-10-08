import type { GetImageToBase64CaseType } from './getImageToBase64'

export const getImageToBase64Cases: GetImageToBase64CaseType[] = [
  {
    index: 0,
    description: 'basic test getImageToBase64',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails-nestjs-server-4/assets/images/youRailsLogos/2026-05-22_logos/yourails_05_cycle.png',
    },
    options: {},
    expected: '',
  },
  {
    index: 1,
    description: 'basic test getImageToBase64',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails-nestjs-server-4/cdkMediaCrud/getFileImagesCombined/__output__/2026-05-23-20-51-22-Mastering-rust-a-modern-programming-language/s_3_2026-05-23-20-51-22_image.png',
    },
    options: {},
    expected: '',
  },
]
