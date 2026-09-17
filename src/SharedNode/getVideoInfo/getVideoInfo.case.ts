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
        '/Users/admin/Dev/__output__/2026-08-15-19-19-48-p_5-Create-local-and-remote-branches-create/2026-09-13-11-02-58_final.mp4',
    } as GetVideoInfoParamsType,
    options: {},
    expected: {} as GetVideoInfoResType,
  },
  {
    description: 'basic test getVideoInfo',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/__output__/2026-08-15-19-19-48-p_5-Create-local-and-remote-branches-create/2026-09-13-13-17-32_final.mp4',
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
