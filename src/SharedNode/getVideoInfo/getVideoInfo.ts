import { promisify } from 'node:util'
import { exec } from 'child_process'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'

const execAsync = promisify(exec)

type FfprobeResultType = {
  format: Record<string, any>
  streams: Array<Record<string, any>>
  chapters?: Array<Record<string, any>>
}

const getVideoInfoFfprobe = async (
  { pathFileAbs }: { pathFileAbs: string },
  { countFrames = false }: { countFrames?: boolean } = {},
): Promise<FfprobeResultType> => {
  const flags = [
    '-v quiet',
    '-print_format json',
    '-show_format',
    '-show_streams',
    '-show_chapters',
    '-show_error',
    countFrames ? '-count_frames -count_packets' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const cmd = `ffprobe ${flags} "${pathFileAbs}"`

  const { stdout, stderr } = await execAsync(cmd, { maxBuffer: 1024 * 1024 * 10 })

  if (stderr) {
    console.warn(`ffprobe stderr for ${pathFileAbs}:`, stderr)
  }

  return JSON.parse(stdout) as FfprobeResultType
}

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           [
             {
               description: 'basic test getValidatedEntityLinksFilesReadable',
              params: {},
               options: {},
               expected: '',
             },
           ]
 */

type GetVideoInfoParamsType = { pathFileAbs: string }

type GetVideoInfoOptionsType = { funcParent?: string }

type GetVideoInfoResType = unknown

type GetVideoInfoType = (
  params: GetVideoInfoParamsType,
  options?: GetVideoInfoOptionsType,
) => GetVideoInfoResType

const optionsDefault = {
  funcParent: 'getVideoInfo',
} satisfies Required<GetVideoInfoOptionsType>

const resDefault: GetVideoInfoResType = ''

/**
 * @description Function to getVideoInfo
 * @usage
   import { getVideoInfo, GetVideoInfoParamsType, GetVideoInfoOptionsType } from './getVideoInfo/getVideoInfo'
   const getVideoInfoParams: GetVideoInfoParamsType = {}
   const getVideoInfoOptions: GetVideoInfoOptionsType = {}
   getVideoInfo(getVideoInfoParams, getVideoInfoOptions)
*/
const getVideoInfoUnsafe: GetVideoInfoType = async (
  { pathFileAbs }: GetVideoInfoParamsType,
  options: GetVideoInfoOptionsType = optionsDefault,
) => {
  const info = await getVideoInfoFfprobe({ pathFileAbs })
  const videoStream = info.streams.find((s: any) => s.codec_type === 'video')

  if (!videoStream) throw new Error(`No video stream found in ${pathFileAbs}`)

  const width = videoStream.width
  const height = videoStream.height
  const rotation = videoStream.side_data_list?.find((sd: any) => 'rotation' in sd)?.rotation ?? 0

  const parseFrameRate = (rateStr: string): number => {
    const [num, den] = rateStr.split('/').map(Number)
    return den ? num / den : num
  }

  const fps = parseFrameRate(videoStream.avg_frame_rate)

  const sizeBytes = parseInt(info.format.size, 10) // 👈 ffprobe returns this as a string
  const sizeKb = sizeBytes / 1024
  const sizeMb = sizeKb / 1024

  return {
    width,
    height,
    rotation,
    displayAspectRatio: videoStream.display_aspect_ratio,
    sampleAspectRatio: videoStream.sample_aspect_ratio,
    isPortrait: rotation % 180 !== 0 ? width > height : height > width,
    durationSec: parseFloat(info.format.duration),
    codecName: videoStream.codec_name,
    fps, // e.g. "30/1" -> 30
    bitrate: info.format.bit_rate ? parseInt(info.format.bit_rate, 10) : null,
    sizeBytes,
    sizeKb: parseFloat(sizeKb.toFixed(2)),
    sizeMb: parseFloat(sizeMb.toFixed(2)),
  }
}

const getVideoInfo = withTryCatchFinallyWrapper<
  GetVideoInfoParamsType,
  GetVideoInfoOptionsType,
  GetVideoInfoResType
>(getVideoInfoUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetVideoInfoCaseType = {
  description?: string
  params: Parameters<typeof getVideoInfo>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getVideoInfo>[1]
  expected: ReturnType<typeof getVideoInfo>
}

export type {
  GetVideoInfoCaseType,
  GetVideoInfoOptionsType,
  GetVideoInfoParamsType,
  GetVideoInfoResType,
  GetVideoInfoType,
}
export { getVideoInfo }
