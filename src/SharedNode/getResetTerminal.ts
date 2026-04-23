import { execSync } from 'child_process'

/**
 * @description resets terminal
    Your process (or the MCP/Playwright subprocess) may have flipped these flags to raw mode and never restored them. The buffer being empty doesn't matter if the terminal driver is still misconfigured.
    setRawMode(false) — tells Node to restore cooked mode at the Node API level
    removeAllListeners/pause — detaches Node's own event machinery from stdin
    stty sane — resets the flags at the OS/tty driver level, which is the authoritative source and overrides everything else
 */
export const getResetTerminal = () => {
  process.stdin.removeAllListeners()
  process.stdin.setRawMode?.(false)
  process.stdin.pause()

  try {
    execSync('stty sane', { stdio: 'inherit' })
  } catch (_) {}
}
