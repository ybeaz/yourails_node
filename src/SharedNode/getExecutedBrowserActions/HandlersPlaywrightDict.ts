import os from 'node:os'
import path from 'node:path'
import { BrowserContext, Page } from 'playwright'
import { HandlersPlaywriteKeysEnum } from 'yourails_common'
import { getShortUrl } from './getShortUrl'

export type HandlerType = (page: Page, args: any, context: BrowserContext) => Promise<unknown>

/* Keys are normalized tool names (prefix `playwright_` / `browser_` stripped) */
export const HandlersPlaywriteDict: Partial<Record<HandlersPlaywriteKeysEnum, HandlerType>> = {
  [HandlersPlaywriteKeysEnum.navigate]: async (page, { url, waitUntil = 'load' }) => {
    await page.goto(url, { waitUntil })
    return { url: page.url() }
  },

  [HandlersPlaywriteKeysEnum.click]: async (page, { selector }) => {
    await page.click(selector)
  },
  [HandlersPlaywriteKeysEnum.click_text]: async (page, { text }) => {
    await page.getByText(text).first().click()
  },
  [HandlersPlaywriteKeysEnum.fill]: async (page, { selector, value }) => {
    await page.fill(selector, value)
  },
  [HandlersPlaywriteKeysEnum.select]: async (page, { selector, value }) => {
    await page.selectOption(selector, value)
  },
  [HandlersPlaywriteKeysEnum.select_text]: async (page, { selector, text }) => {
    await page.selectOption(selector, { label: text })
  },
  [HandlersPlaywriteKeysEnum.hover]: async (page, { selector }) => {
    await page.hover(selector)
  },
  [HandlersPlaywriteKeysEnum.hover_text]: async (page, { text }) => {
    await page.getByText(text).first().hover()
  },
  [HandlersPlaywriteKeysEnum.press]: async (page, { key }) => {
    await page.keyboard.press(key)
  },
  [HandlersPlaywriteKeysEnum.wait_for_selector]: async (page, { selector, state = 'visible' }) => {
    await page.waitForSelector(selector, { state })
  },
  [HandlersPlaywriteKeysEnum.evaluate]: async (page, { script }) => {
    return page.evaluate(script)
  },
  [HandlersPlaywriteKeysEnum.screenshot]: async (
    page,
    { name = 'screenshot', fullPage = false, path: filePath },
  ) => {
    const target = filePath ?? path.join(os.tmpdir(), `${name}-${Date.now()}.png`)
    await page.screenshot({ path: target, fullPage })
    return { path: target }
  },
  [HandlersPlaywriteKeysEnum.get_text]: async (page, { selector }) => {
    return page.locator(selector).first().innerText()
  },
  [HandlersPlaywriteKeysEnum.get_html]: async (page, { selector }) => {
    return selector ? page.locator(selector).first().innerHTML() : page.content()
  },
  [HandlersPlaywriteKeysEnum.wait_for_url]: async (
    page,
    { url, timeoutMs = 15000, waitUntil = 'commit', isRequired = true },
  ) => {
    try {
      await page.waitForURL(url, { timeout: timeoutMs, waitUntil })
      return { isMatched: true, url: getShortUrl(page.url()) }
    } catch (error: any) {
      if (isRequired) throw error
      return { isMatched: false, url: getShortUrl(page.url()) }
    }
  },
  [HandlersPlaywriteKeysEnum.selector_check]: async (
    page,
    { selector, timeoutMs = 3000, isHtml = false },
  ) => {
    /* No selector: return a small page summary instead of the whole DOM */
    if (!selector) {
      const html = await page.content()
      return {
        url: page.url(),
        title: await page.title(),
        htmlLength: html.length,
        htmlHead: html.slice(0, 300),
      }
    }

    const locator = page.locator(selector)
    await locator
      .first()
      .waitFor({ state: 'attached', timeout: timeoutMs })
      .catch(() => {})

    const count = await locator.count()
    const isFound = count > 0

    return {
      selector,
      isFound,
      isVisible: isFound ? await locator.first().isVisible() : false,
      count,
      url: page.url(),
      frameCount: page.frames().length,
      text: isFound
        ? (
            await locator
              .first()
              .innerText()
              .catch(() => undefined)
          )?.slice(0, 100)
        : undefined,
      ...(isHtml &&
        isFound && {
          html: (
            await locator
              .first()
              .innerHTML()
              .catch(() => undefined)
          )?.slice(0, 2000),
        }),
    }
  },
  [HandlersPlaywriteKeysEnum.click_selector]: async (page, { selector, timeoutMs = 10000 }) => {
    const locator = page.locator(selector).first()
    await locator.waitFor({ state: 'visible', timeout: timeoutMs })

    const urlBefore = page.url()
    await locator.scrollIntoViewIfNeeded()
    await locator.click({ timeout: timeoutMs })

    /* Give the click a moment to cause navigation; not an error if none happens */
    await page.waitForURL((url) => url.toString() !== urlBefore, { timeout: 5000 }).catch(() => {})

    return {
      selector,
      isClicked: true,
      isNavigated: page.url() !== urlBefore,
      url: page.url(),
    }
  },
}
