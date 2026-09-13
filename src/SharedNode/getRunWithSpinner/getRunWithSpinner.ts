import * as readline from 'readline'
import { consoler } from '../consoler'

let spinnerActive = false

export function getRunWithSpinner<P, O, R>(
  func: (params: P, options?: O) => R | Promise<R>,
  messageInProgress: string = 'Processing',
  messageFinal: string = '',
): (params: P, options?: O) => Promise<R> {
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

      readline.cursorTo(process.stdout, 0)
      readline.clearLine(process.stdout, 0)
      process.stdout.write(text)
    }

    if (isTTY) {
      render(`${frames[0]} 0s ${messageInProgress}`)
    } else {
      consoler(`${messageInProgress}...\n`, '')
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)

      render(`${frames[frame++ % frames.length]} ${elapsed}s ${messageInProgress}`)
    }, 100)

    const cleanup = (icon: string) => {
      clearInterval(interval)

      const elapsed = Math.floor((Date.now() - startTime) / 1000)
        .toString()
        .padStart(2, '0')

      const text = messageFinal ? `${icon} ${elapsed}s ${messageFinal}` : `${icon} ${elapsed}s`

      if (isTTY) {
        render(text)
        process.stdout.write('\n')
      } else {
        console.log(text)
        process.stdout.write('\n')
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
