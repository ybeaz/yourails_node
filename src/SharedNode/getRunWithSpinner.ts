import * as readline from 'readline'

let spinnerActive = false

export function getRunWithSpinner<P, O, R>(
  func: (params: P, options?: O) => R | Promise<R>,
  message: string = 'Processing'
): (params: P, options?: O) => R | Promise<R> {
  return async (params = {} as Required<P>, options) => {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    let i = 0
    const startTime = Date.now()

    // Wait for any previous spinner to fully clean up
    while (spinnerActive) {
      await new Promise(resolve => setTimeout(resolve, 10))
    }
    spinnerActive = true

    const interval = setInterval(() => {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0)
      readline.clearLine(process.stdout, 0)
      readline.cursorTo(process.stdout, 0)
      process.stdout.write(`${frames[i++ % frames.length]} ${elapsed}s ${message}`)
    }, 100)

    const cleanup = (icon: string) => {
      let totalTime = ((Date.now() - startTime) / 1000).toFixed(0).padStart(2, '0')
      clearInterval(interval)
      readline.clearLine(process.stdout, 0)
      readline.cursorTo(process.stdout, 0)
      console.log(`${icon} ${totalTime}s ${message}`)
      spinnerActive = false // release lock only after line is fully written
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
