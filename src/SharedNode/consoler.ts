interface ConsolerType {
  (
    comment: string,
    entity: any,
    options?: { headerColor: string; logColor: string; endLog: string }
  ): void
}

const optionsDefault = { headerColor: 'cyan', logColor: 'gray', endLog: '\n' }

/**
 * @description Function to
 * @run ts-node tools/consoler.ts
 * @import import { consoler } from './consoler'
 */

export const consoler: ConsolerType = (comment, entity, options = optionsDefault) => {
  if (typeof window !== 'undefined') return

  const chalk = require('chalk')
  const util = require('util')
  const { headerColor, logColor, endLog } = options

  const inspectedObject = util.inspect(entity, { depth: null })

  const chalkComment = chalk.bold.cyan(comment)
  const chalkInspectObject = chalk.gray(inspectedObject)
  const toPrint = `${chalkComment} ${chalkInspectObject} ${endLog}`
  console.info(toPrint)
}

/**
 * @description Here the file is being run directly
 */
if (require.main === module) {
  ;(async () => {
    const params = { a: 'abc', b: [1234, 5678, 9012] }
    consoler('consoler [36]', params)
  })()
}
