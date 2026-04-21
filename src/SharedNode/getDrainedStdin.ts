export const getDrainedStdin = () =>
  new Promise<void>(resolve => {
    if (!process.stdin.isTTY) return resolve()

    process.stdin.setRawMode(true)
    process.stdin.resume()

    const drain = () => {} // discard all pending bytes

    process.stdin.on('data', drain)

    // Give it 100ms to flush anything buffered, then clean up
    setTimeout(() => {
      process.stdin.removeListener('data', drain)
      process.stdin.setRawMode(false)
      process.stdin.pause()
      resolve()
    }, 100)
  })
