import { consoler } from 'yourails_common'

export { consoler }

// Remove after 2026-07-01
// import { util, chalk } from './consolerEval'

// interface ConsolerType {
//   (
//     comment: string,
//     entity: any,
//     options?: { headerColor: string; logColor: string; endLog: string }
//   ): void
// }

// const optionsDefault = { headerColor: 'cyan', logColor: 'gray', endLog: '\n' }

// /**
//  * @description Function to
//  * @run npx tsx tools/consoler.ts
//  * @import import { consoler } from './consoler'
//  */

// export const consoler: ConsolerType = (comment, entity, options = optionsDefault) => {
//   if (typeof window !== 'undefined') return

//   const { headerColor, logColor, endLog } = options

//   const inspectedObject = util.inspect(entity, { depth: null })

//   const chalkComment = chalk.bold.cyan(comment)
//   const chalkInspectObject = chalk.gray(inspectedObject)
//   const toPrint = `${chalkComment} ${chalkInspectObject} ${endLog}`

//   const isConsoleInfo =
//     process.stdout && typeof process.stdout.write === 'function' && process.stdout.isTTY === true

//   if (isConsoleInfo) console.info(toPrint)
//   else console.error(toPrint)
// }

// /**
//  * @description Here the file is being run directly
//  */
// if (require.main === module) {
//   ;(async () => {
//     const params = { a: 'abc', b: [1234, 5678, 9012] }
//     consoler('consoler [36]', params)
//   })()
// }
