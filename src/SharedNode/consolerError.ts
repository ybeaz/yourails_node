import chalk from 'chalk'
import { consoler } from './consoler'

interface ConsolerType {
  (fileName: string, error: any): void
}

/**
 * @description Function to
 * @import import { consolerError } from './consolerError'
 */

export const consolerError: ConsolerType = (message, params) => {
  if (typeof window !== 'undefined') return
  const chalk = require('chalk')
  let messageNext = message[0] === '\ud83d' ? message : `📕 ${message}`
  messageNext = `${messageNext} FAILURE`

  console.log('\n')
  consoler(chalk.bold.red(messageNext), params)
  console.log('\n')
}
