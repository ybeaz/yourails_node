import { createInterface } from 'readline'
import { consoler } from 'yourails_common'
import { withTryCatchFinallyWrapper, FuncModeEnumType } from 'yourails_common'

type GetPausedScriptParamsType = { message?: string }

type GetPausedScriptOptionsType = { funcParent?: string }

type GetPausedScriptResType = any

interface GetPausedScriptType {
  (params: GetPausedScriptParamsType, options?: GetPausedScriptOptionsType): GetPausedScriptResType
}

const optionsDefault: Required<GetPausedScriptOptionsType> = {
  funcParent: 'getPausedScript',
}

const resDefault: GetPausedScriptResType = ''

/**
 * @description Function to getPausedScript
 * @import import { getPausedScript } from './getPausedScript'
 */

const getPausedScriptUnsafe: GetPausedScriptType = ({ message = 'Press Enter to continue...' }) => {
  return new Promise(resolve => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.question(message, () => {
      rl.close()
      resolve('void')
    })
  })
}

const getPausedScript = withTryCatchFinallyWrapper(getPausedScriptUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export { getPausedScript, getPausedScriptUnsafe }
export type {
  GetPausedScriptParamsType,
  GetPausedScriptOptionsType,
  GetPausedScriptResType,
  GetPausedScriptType,
}

/**
 * @description Here the file is being run directly
 * @run ts-node src/Shared/getPausedScript.ts
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
    })
    await Promise.all(promises)
  })()
}
