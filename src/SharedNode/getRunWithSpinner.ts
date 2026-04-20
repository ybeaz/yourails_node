import * as readline from 'readline'

export function getRunWithSpinner<P, O, R>(
  func: (params: P, options?: O) => R | Promise<R>,
  message: string = 'Processing'
): (params: P, options?: O) => R | Promise<R> {
  return async (params = {} as Required<P>, options) => {
    const frames: string[] = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    let i: number = 0
    const startTime: number = Date.now()

    const interval = setInterval(() => {
      const elapsed: number = ((Date.now() - startTime) / 1000).toFixed(0) as unknown as number
      readline.clearLine(process.stdout, 0)
      readline.cursorTo(process.stdout, 0)
      process.stdout.write(`${frames[i++ % frames.length]} ${elapsed}s ${message}...`)
    }, 100)

    try {
      const result = await func(params, options)
      const totalTime: string = ((Date.now() - startTime) / 1000).toFixed(0)
      clearInterval(interval)
      readline.clearLine(process.stdout, 0)
      readline.cursorTo(process.stdout, 0)
      console.log(`✅ ${totalTime}s ${message} complete.`)
      return result
    } catch (error) {
      const totalTime: string = ((Date.now() - startTime) / 1000).toFixed(0)
      clearInterval(interval)
      readline.clearLine(process.stdout, 0)
      readline.cursorTo(process.stdout, 0)
      console.log(`❌ ${totalTime}s ${message} failed.`)
      throw error
    }
  }
}
