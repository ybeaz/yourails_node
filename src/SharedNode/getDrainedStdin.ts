/**
 * @description getDrainedStdin — flushes buffered input (runtime state). While your process runs, the user may press keys (like up arrow ^[[A). Those keystrokes get stored in the OS's input buffer — a queue of bytes waiting to be read. If your process exits without consuming them, the shell inherits that buffer and "replays" the keys, which is exactly what you see as ^[[A^[[A at the prompt.
 */
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
