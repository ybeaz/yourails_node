import { join } from 'node:path'
import type {
  GetVideoInfoCaseType,
  GetVideoInfoParamsType,
  GetVideoInfoResType,
} from './getVideoInfo'

export const getVideoInfoCases: GetVideoInfoCaseType[] = [
  {
    description: 'basic test getVideoInfo',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/__output__/2026-08-15-19-19-10-p_0-Create-an-ssh-key-generate-an/2026-09-06-12-09-46_final.mp4',
    } as GetVideoInfoParamsType,
    options: {},
    expected: {} as GetVideoInfoResType,
  },
  // {
  //   description: 'for formal test: basic test getVideoInfo',
  //   params: {
  //     pathFileAbs: join(__dirname, '__mocks__', '2026-09-06-08-12-33_final.mp4'),
  //   } as GetVideoInfoParamsType,
  //   options: {},
  //   expected: {
  //     width: 540,
  //     height: 960,
  //     rotation: 0,
  //     displayAspectRatio: '9:16',
  //     sampleAspectRatio: '1:1',
  //     isPortrait: true,
  //     durationSec: 103.625,
  //     codecName: 'h264',
  //     fps: 25,
  //     bitrate: '168551',
  //   },
  // },
]
