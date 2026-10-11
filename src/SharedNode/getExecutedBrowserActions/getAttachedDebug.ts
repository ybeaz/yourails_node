import { Page } from 'playwright'
import { getShortUrl } from './getShortUrl'

const IGNORED_CONSOLE_PATTERNS = [/Permissions policy violation/i]

export const getAttachedDebug = (p: Page, isShowingInfo: boolean): Page => {
  if (!isShowingInfo) return p

  let lastUrl = ''

  p.on('console', (msg) => {
    const text = msg.text()
    if (IGNORED_CONSOLE_PATTERNS.some((pattern) => pattern.test(text))) return
    console.log(`[page console:${msg.type()}]`, text.slice(0, 300))
  })

  p.on('pageerror', (err) => console.log('[page error]', err.message.slice(0, 300)))

  p.on('framenavigated', (frame) => {
    if (frame !== p.mainFrame()) return
    const shortUrl = getShortUrl(frame.url())
    if (shortUrl === lastUrl) return /* skip duplicates */
    lastUrl = shortUrl
    console.log('[navigated]', shortUrl)
  })

  p.on('requestfailed', (req) =>
    console.log('[request failed]', getShortUrl(req.url()), req.failure()?.errorText),
  )

  return p
}
