import { createInterface } from 'readline'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'
import { consoler } from './consoler'

type GetPausedScriptParamsType = { message?: string }

type GetPausedScriptOptionsType = { funcParent?: string }

type GetPausedScriptResType = any

type GetPausedScriptType = (
  params: GetPausedScriptParamsType,
  options?: GetPausedScriptOptionsType,
) => Promise<GetPausedScriptResType>

const optionsDefault: Required<GetPausedScriptOptionsType> = {
  funcParent: 'getPausedScript',
}

const resDefault: GetPausedScriptResType = ''

/**
 * @description Function to getPausedScript
 * @import import { getPausedScript } from './getPausedScript'
 */

const getPausedScriptUnsafe: GetPausedScriptType = ({ message = 'Press Enter to continue...' }) => {
  return new Promise((resolve) => {
    process.stdout.write(message)

    if (!process.stdin.isTTY) {
      process.stdin.once('data', () => resolve(true))
      return
    }

    // Use raw mode but only listen for Enter, discard everything else
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    const onData = (key: string) => {
      // Only resolve on Enter (\r or \n), discard all other keys silently
      if (key === '\r' || key === '\n' || key === '\u0003') {
        process.stdin.removeListener('data', onData)
        process.stdin.setRawMode(false)
        process.stdin.pause()
        resolve(true)
      }
      // All other keys (including arrow keys ^[[A) are silently swallowed
    }

    process.stdin.on('data', onData)
  })
}

const getPausedScript = withTryCatchFinallyWrapper(getPausedScriptUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export type {
  GetPausedScriptOptionsType,
  GetPausedScriptParamsType,
  GetPausedScriptResType,
  GetPausedScriptType,
}
export { getPausedScript, getPausedScriptUnsafe }

/**
 * @description Here the file is being run directly
 * @run npx tsx src/Shared/getPausedScript.ts
 */
if (require.main === module) {
  ;(async () => {
    type ExampleType = {
      params: GetPausedScriptParamsType
      options: GetPausedScriptOptionsType
      expected: GetPausedScriptResType
    }
    const examples: ExampleType[] = [{ params: {}, options: {}, expected: '' }]

    const promises = examples.map((example: ExampleType, index: number) => {
      const { params, options, expected } = example

      const output = getPausedScript(params, options)
      consoler(`getPausedScript [61-${index}]`, {
        params,
        output,
        tested: JSON.stringify(output) === JSON.stringify(expected),
      })
      return null
    })
    await Promise.all(promises)
  })()
}
