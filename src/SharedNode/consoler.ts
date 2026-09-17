import { chalk, util } from './consolerEval'

type ConsolerType = (comment: string, entity?: any) => string

/**
 * @description Function to
 * @run npx tsx tools/consoler.ts
 * @import import { consoler } from './consoler'
 */

export const consoler: ConsolerType = (comment, entity): string => {
  if (typeof window !== 'undefined') return ''

  const inspectedObject = util.inspect(entity, { depth: null })

  const chalkComment = comment ? chalk.bold.cyan(comment) : ''
  const chalkInspectObject = entity ? chalk.gray(inspectedObject) : undefined

  const toPrint = [chalkComment, chalkInspectObject].filter(Boolean).join(' ')

  const isConsoleInfo =
    process.stdout && typeof process.stdout.write === 'function' && process.stdout.isTTY === true

  if (isConsoleInfo) console.info(toPrint)
  else console.error(toPrint)

  return toPrint
}

/**
 * @description Here the file is being run directly
 * @run npx tsx src/SharedNode/consoler.ts
 */
if (require.main === module) {
  ;(async () => {
    const params = { a: 'abc', b: [1234, 5678, 9012] }
    consoler('consoler [37]', params)

    consoler('consoler [39]')
  })()
}
