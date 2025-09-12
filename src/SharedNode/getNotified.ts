import { nanoid } from 'nanoid'
import { NotificationCenter } from 'node-notifier'
import {
  withTryCatchFinallyWrapper,
  FuncModeEnumType,
  WithTryCatchFinallyWrapperOptionsType,
} from 'yourails_common'
import { consoler } from 'yourails_common'
import { timeout } from 'yourails_common'

enum SoundLocalEnum {
  alarm_2025_09_03_01 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/alarm_2025_09_03_01.mp3',
  alarm_2025_09_03_02 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/alarm_2025_09_03_02.mp3',
  alarm_2025_09_03_03 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/alarm_2025_09_03_03.mp3',
  bell_2025_09_03_01 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/bell_2025_09_03_01.mp3',
  bell_2025_09_03_02 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/bell_2025_09_03_02.mp3',
  bell_2025_09_03_03 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/bell_2025_09_03_03.mp3',
  bell_2025_09_03_04 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/bell_2025_09_03_04.mp3',
  bell_2025_09_03_05 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/bell_2025_09_03_05.mp3',
  bell_2025_09_03_06 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/bell_2025_09_03_06.mp3',
  bell_2025_09_03_07 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/bell_2025_09_03_07.mp3',
  bell_2025_09_03_08 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/bell_2025_09_03_08.mp3',
  bell_2025_09_03_09 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/bell_2025_09_03_09.mp3',
  bell_2025_09_03_10 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/bell_2025_09_03_10.mp3',
  bell_2025_09_03_11 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/bell_2025_09_03_11.mp3',
  countdown_2025_09_03_01 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/countdown_2025_09_03_01.mp3',
  countdown_2025_09_03_02 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/countdown_2025_09_03_02.mp3',
  countdown_2025_09_03_03 = '/Users/admin/Dev/yourails-nestjs-server-4/assets/audio/sounds/countdown_2025_09_03_03.mp3',
  Basso = '/System/Library/Sounds/Basso.aiff',
  Blow = '/System/Library/Sounds/Blow.aiff',
  Bottle = '/System/Library/Sounds/Bottle.aiff',
  Frog = '/System/Library/Sounds/Frog.aiff',
  Funk = '/System/Library/Sounds/Funk.aiff',
  Glass = '/System/Library/Sounds/Glass.aiff',
  Hero = '/System/Library/Sounds/Hero.aiff',
  Morse = '/System/Library/Sounds/Morse.aiff',
  Ping = '/System/Library/Sounds/Ping.aiff',
  Pop = '/System/Library/Sounds/Pop.aiff',
  Purr = '/System/Library/Sounds/Purr.aiff',
  Sosumi = '/System/Library/Sounds/Sosumi.aiff',
  Submarine = '/System/Library/Sounds/Submarine.aiff',
  Tink = '/System/Library/Sounds/Tink.aiff',
}

type GetNotifiedParamsType = {
  isNotification?: boolean
  messageTitle?: string
  messageBody?: string
  isSound?: boolean
  soundKind?: SoundLocalEnum | SoundLocalEnum[]
  soundRepeatTimesMax?: number
  soundIntervalMs?: number
}

type GetNotifiedOptionsType = { funcParent?: string }

type GetNotifiedResType = void

interface GetNotifiedType {
  (params: GetNotifiedParamsType, options?: GetNotifiedOptionsType): GetNotifiedResType
}

const optionsDefault: Required<GetNotifiedOptionsType> = {
  funcParent: 'getNotified',
}

const resDefault: GetNotifiedResType = undefined

/**
 * @description Function to getNotified
 * @link https://zvukipro.com/predmet/4618-zvuki-kolokolchika-dlja-prislugi.html
 * @import import {
    getNotified,
    GetNotifiedParamsType,
    SoundLocalEnum,
    GetNotifiedResType 
  } from './getNotified'
 */

const getNotifiedUnsafe: GetNotifiedType = async ({
  isNotification,
  messageTitle,
  messageBody,
  isSound,
  soundKind: soundKindIn = SoundLocalEnum.Glass,
  soundRepeatTimesMax = 1,
  soundIntervalMs = 500,
}: GetNotifiedParamsType) => {
  if (typeof window !== 'undefined') return

  if (isNotification) {
    const notifier = new NotificationCenter({
      customPath: '/usr/local/bin/terminal-notifier', // Your custom path
    })

    const notifierParams = {
      title: messageTitle,
      message: messageBody,
      sound: true,
      wait: false,
    }

    notifier.notify(notifierParams)
  }

  if (isSound) {
    const { promisify } = await import('util')
    const exec = promisify(require('child_process').exec)

    let count = 0
    let soundsKinds = soundKindIn
    if (!Array.isArray(soundKindIn)) soundsKinds = [soundKindIn]
    while (count < soundRepeatTimesMax) {
      for await (let soundKind of soundsKinds) {
        await exec(`afplay ${soundKind}`)
        await timeout(soundIntervalMs)
      }
      count += 1
    }
  }
  return
}

const getNotified = withTryCatchFinallyWrapper(getNotifiedUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export { getNotified, SoundLocalEnum }
export type { GetNotifiedParamsType, GetNotifiedResType, GetNotifiedOptionsType, GetNotifiedType }

/**
 * @description Here the file is being run directly
 * @link https://zvukipro.com/predmet/4618-zvuki-kolokolchika-dlja-prislugi.html
 * @run ts-node src/SharedNode/getNotified.ts
 */
if (require.main === module) {
  ;(async () => {
    type ExampleType = {
      params: GetNotifiedParamsType
      options: GetNotifiedOptionsType
      expected: GetNotifiedResType
    }
    const examples: ExampleType[] = [
      // {
      //   params: {
      //     isNotification: true,
      //     messageTitle: `My Title ${nanoid()}`,
      //     messageBody: `My Message ${nanoid()}`,
      //     isSound: true,
      //     soundKind: MacOsSoundEnumType.Submarine,
      //     soundRepeatTimesMax: 2,
      //     soundIntervalMs: 1000,
      //   },
      //   options: {},
      //   expected: undefined,
      // },
      // {
      //   params: {
      //     isNotification: true,
      //     messageTitle: `My Title ${nanoid()}`,
      //     messageBody: `My Message ${nanoid()}`,
      //     isSound: true,
      //     soundKind: [SoundLocalEnum.Frog, SoundLocalEnum.Funk, SoundLocalEnum.Hero],
      //     soundRepeatTimesMax: 3,
      //     soundIntervalMs: 100,
      //   },
      //   options: {},
      //   expected: undefined,
      // },
      // {
      //   params: {
      //     isNotification: true,
      //     messageTitle: `My Title ${nanoid()}`,
      //     messageBody: `My Message ${nanoid()}`,
      //     isSound: true,
      //     soundKind: [SoundLocalEnum.alarm_2025_09_03_01],
      //     soundRepeatTimesMax: 1,
      //     soundIntervalMs: 100,
      //   },
      //   options: {},
      //   expected: undefined,
      // },
      {
        params: {
          isNotification: true,
          messageTitle: `My Title ${nanoid()}`,
          messageBody: `My Message ${nanoid()}`,
          isSound: true,
          soundKind: [
            SoundLocalEnum.bell_2025_09_03_01,
            SoundLocalEnum.bell_2025_09_03_02,
            SoundLocalEnum.bell_2025_09_03_03,
          ],
          soundRepeatTimesMax: 2,
          soundIntervalMs: 100,
        },
        options: {},
        expected: undefined,
      },
    ]

    const promises = examples.map(async (example: ExampleType, index: number) => {
      const { params, options, expected } = example

      const output = await getNotified(params, options)
      consoler(`getNotified [61-${index}]`, {
        params,
        expected,
        output,
        tested: JSON.stringify(output) === JSON.stringify(expected),
      })
    })
    await Promise.all(promises)
  })()
}
