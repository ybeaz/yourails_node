import readline from 'node:readline'
import { inspect } from 'node:util'
import chalk from 'chalk'
import sliceAnsi from 'slice-ansi'

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

    const formatElapsed = () => chalk.bold.cyan(`${Math.floor((Date.now() - startTime) / 1000)}s`)

    // Re-read columns on every render so terminal resizes are respected.
    // Spinner frames are clipped to a single row; the final line is not.
    const render = (text: string, { truncate = true } = {}) => {
      if (!isTTY) return

      const width = Math.max((process.stdout.columns || 80) - 1, 1)
      const output = truncate ? sliceAnsi(text, 0, width) : text

      readline.clearLine(process.stdout, 0)
      readline.cursorTo(process.stdout, 0)
      process.stdout.write(output)
    }

    const renderFrame = () =>
      render(`${frames[frame++ % frames.length]} ${formatElapsed()} ${messageInProgress}`)

    if (isTTY) {
      renderFrame()
    } else {
      console.log(`${messageInProgress}...`)
    }

    const interval = setInterval(renderFrame, 100)

    const cleanup = (icon: string) => {
      clearInterval(interval)

      const elapsed = formatElapsed()
      const text = messageFinal ? `${icon} ${elapsed} ${messageFinal}` : `${icon} ${elapsed}`

      if (isTTY) {
        render(text, { truncate: false })
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
