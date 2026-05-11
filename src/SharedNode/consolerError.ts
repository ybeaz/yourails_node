import { isError } from 'yourails_common'
import { consoler } from './consoler'

type ConsolerType = (fileName: string, error: any) => void

/**
 * @description Function to log error kind of params
 * @import import { consolerError } from './consolerError'
 */
export const consolerError: ConsolerType = (message, params) => {
  if (typeof window !== 'undefined') return
  const chalk = require('chalk')
  let messageNext = message[0] === '\ud83d' ? message : `📕 ${message}`
  messageNext = `${messageNext} FAILURE`

  let paramsNext = params
  if (isError(params)) {
    const _stack = params.stack
      ?.split('\n')
      .slice(2, 6) // keep only relevant frames
      .join('\n')

    paramsNext = {
      name: params.name,
      message: params.message,
      stack: params.stack,
    }

    // A variant
    // paramsNext = `${params.name}: ${params.message}\n${params.stack}`
  }

  console.log(`\n${chalk.bold.red(messageNext)}`)
  consoler('', paramsNext)
  console.log()
}
