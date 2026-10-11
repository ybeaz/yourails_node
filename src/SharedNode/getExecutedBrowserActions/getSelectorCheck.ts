import { BrowserContext, Page } from 'playwright'

type SelectorCheckResType = {
  selector: string
  isFound: boolean
  isVisible: boolean
  count: number
  url: string
  frameCount: number
  text?: string
}

type SelectorCheckArgsType = {
  selector: string
  timeoutMs?: number
}

const getSelectorCheck = async (
  page: Page,
  { selector, timeoutMs = 3000 }: SelectorCheckArgsType,
  _context?: BrowserContext,
): Promise<SelectorCheckResType> => {
  const locator = page.locator(selector)

  /* Wait briefly so we don't report "not found" before the page has rendered */
  await locator
    .first()
    .waitFor({ state: 'attached', timeout: timeoutMs })
    .catch(() => {})

  const count = await locator.count()
  const isFound = count > 0
  const isVisible = isFound ? await locator.first().isVisible() : false
  const text = isFound
    ? (
        await locator
          .first()
          .innerText()
          .catch(() => undefined)
      )?.slice(0, 100)
    : undefined

  return {
    selector,
    isFound,
    isVisible,
    count,
    url: page.url(),
    frameCount: page.frames().length,
    text,
  }
}

export type { SelectorCheckArgsType, SelectorCheckResType }
export { getSelectorCheck }

/* Register in HandlersPlaywriteDict, e.g.: checkSelector: getSelectorCheck */
