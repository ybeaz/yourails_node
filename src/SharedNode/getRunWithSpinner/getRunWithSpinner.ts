import readline from 'node:readline'
import { inspect } from 'node:util'
import chalk from 'chalk'

let spinnerActive = false

/**
 * Builds a spinner message from a comment + optional inspected object,
 * e.g. formatSpinnerMessage('Fetching user', user) ->
 *   "<bold cyan>Fetching user</> <gray>{ id: 1, name: 'Alice' }</>"
 */
export function formatSpinnerMessage(comment: string, object?: unknown): string {
  const chalkComment = chalk.bold.cyan(comment)

  if (object === undefined) return chalkComment

  const inspectedObject =
    typeof object === 'string' ? object : inspect(object, { colors: false, depth: 4 })
  const chalkInspectObject = chalk.gray(inspectedObject)

  return `${chalkComment} ${chalkInspectObject}`
}

export function getRunWithSpinner<P, O, R>(
  func: (params: P, options?: O) => R | Promise<R>,
  messageInProgressIn: string = 'Processing',
  messageFinalIn: string = '',
): (params: P, options?: O) => Promise<R> {
  const messageInProgress = formatSpinnerMessage(messageInProgressIn)
  const messageFinal = formatSpinnerMessage(messageFinalIn)

  return async (params = {} as Required<P>, options?: O): Promise<R> => {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

    while (spinnerActive) {
      await new Promise((resolve) => setTimeout(resolve, 10))
    }

    spinnerActive = true

    const isTTY = Boolean(process.stdout.isTTY)
    const startTime = Date.now()
    let frame = 0

    const render = (text: string) => {
      if (!isTTY) return

      readline.clearLine(process.stdout, 0)
      readline.cursorTo(process.stdout, 0)
      process.stdout.write(text)
    }

    if (isTTY) {
      render(`${frames[0]} ${chalk.bold.cyan('0s')} ${messageInProgress}`)
    } else {
      console.log(`${messageInProgress}...`)
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)

      render(
        `${frames[frame++ % frames.length]} ${chalk.bold.cyan(`${elapsed}s`)} ${messageInProgress}`,
      )
    }, 100)

    const cleanup = (icon: string) => {
      clearInterval(interval)

      const elapsed = chalk.bold.cyan(
        Math.floor((Date.now() - startTime) / 1000)
          .toString()
          .padStart(2, '0') + 's',
      )

      const text = messageFinal ? `${icon} ${elapsed} ${messageFinal}` : `${icon} ${elapsed}`

      if (isTTY) {
        render(text)
        process.stdout.write('\n')
      } else {
        console.log(text)
      }

      spinnerActive = false
    }

    try {
      const result = await func(params, options)
      cleanup('✅')
      return result
    } catch (error) {
      cleanup('❌')
      throw error
    }
  }
}
