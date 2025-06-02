process.env['DEBUG'] = '*:INFO, *:WARN, *:ERR'

import { debug } from 'debug'
const currentLine = require('current-line')

/**
 * @status NOT USED, NOT EXPORTED, CAUSED BUG
 * Description: Debugging tools
 * Example:
 *  debug(`${comment().method}[${comment().line}]`, 'Debug line x')
 * Link: https://www.npmjs.com/package/debug
 * Link: https://www.npmjs.com/package/current-line    https://npm.io/package/current-line
 * Link: alternative https://www.npmjs.com/package/get-current-line
 */

export const info = typeof window === 'undefined' && debug('yn:INFO')
export const warn = typeof window === 'undefined' && debug('yn:WARN')
export const err = typeof window === 'undefined' && debug('yn:ERR')
export const comment = currentLine.get
