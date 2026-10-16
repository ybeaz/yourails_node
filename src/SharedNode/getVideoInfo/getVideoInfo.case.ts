import { join } from 'node:path'
import type {
  GetVideoInfoCaseType,
  GetVideoInfoParamsType,
  GetVideoInfoResType,
} from './getVideoInfo'

export const getVideoInfoCases: GetVideoInfoCaseType[] = [
  {
    index: 1,
    description: 'basic test getVideoInfo',
    params: {
      pathFileAbs: join(__dirname, '__mocks__', '2026-10-15-11-05-25_final.mp4'),
    } as GetVideoInfoParamsType,
    options: {},
    expected: {
      width: 1080,
      height: 1920,
      rotation: 0,
      displayAspectRatio: '9:16',
      sampleAspectRatio: '1:1',
      isPortrait: true,
      durationSec: 84.575,
      codecName: 'h264',
      fps: 25,
      bitrate: 568730,
      sizeBytes: 6012547,
      sizeKb: 5871.63,
      sizeMb: 5.73,
    },
  },
  {
    index: 0,
    description: 'basic test getVideoInfo',
    params: {
      pathFileAbs: join(__dirname, '__mocks__', '2026-09-06-08-12-33_final.mp4'),
    } as GetVideoInfoParamsType,
    options: {},
    expected: {
      width: 540,
      height: 960,
      rotation: 0,
      displayAspectRatio: '9:16',
      sampleAspectRatio: '1:1',
      isPortrait: true,
      durationSec: 103.625,
      codecName: 'h264',
      fps: 25,
      bitrate: 168551,
      sizeBytes: 2183272,
      sizeKb: 2132.1,
      sizeMb: 2.08,
    },
  },
]
