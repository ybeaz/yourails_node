import {
  FuncModeEnumType,
  getEncodedUrlParams,
  isStringURLEncoded,
  withTryCatchFinallyWrapper,
} from 'yourails_common'
import { consoler } from '../consoler'
import {
  GetHtmlBlockExtractedResType,
  GetHtmlBlocksExtractedOptionsType,
  GetHtmlBlocksExtractedParamsType,
  getHtmlBlocksExtracted,
} from '../getHtmlBlocksExtracted/getHtmlBlocksExtracted'
import {
  GetHtmlFromHtmlPageCaseType,
  GetHtmlFromHtmlPageOptionsType,
  GetHtmlFromHtmlPageParamsType,
  GetHtmlFromHtmlPageResType,
  GetHtmlFromHtmlPageType,
} from '../getHtmlFromHtmlPage/getHtmlFromHtmlPage'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           export const withHtmlSelectorsPickerCases: WithHtmlSelectorsPickerCaseType[] = [
             {
               index: 0,
               description: 'basic test getValidatedEntityLinksFilesReadable',
               params: {},
               options: {},
               expected: '',
             },
           ]
 */

type WithHtmlSelectorsPickerParamsType = GetHtmlFromHtmlPageParamsType & { html?: string }

type WithHtmlSelectorsPickerOptionsType = {
  funcParent?: string
  /** Return the full html when selectors are given but nothing matched (default: true) */
  fallbackToFullHtml?: boolean
}

type WithHtmlSelectorsPickerResType = GetHtmlFromHtmlPageResType

type WithHtmlSelectorsPickerType = (
  func: (
    p: GetHtmlFromHtmlPageParamsType,
    o: GetHtmlFromHtmlPageOptionsType,
  ) => Promise<GetHtmlFromHtmlPageResType>,
) => (
  params: WithHtmlSelectorsPickerParamsType,
  options?: WithHtmlSelectorsPickerOptionsType,
) => Promise<WithHtmlSelectorsPickerResType>

const optionsDefault = {
  funcParent: 'withHtmlSelectorsPicker',
  fallbackToFullHtml: true,
} satisfies Required<WithHtmlSelectorsPickerOptionsType>

const resDefault: WithHtmlSelectorsPickerResType = { html: '' }

const AFTER = 'AFTER_INCLUDE:'
const BEFORE = 'BEFORE_INCLUDE:'

const PARAM_KEYS = {
  fromSelector: ['from_s', 'from_sel', 'from_selector'],
  toSelector: ['to_s', 'to_sel', 'to_selector'],
  selectors: ['ss', 'sels', 'selectors'],
} as const

/** Split on commas that are not inside (), [] or quotes */
const splitTopLevel = (str: string): string[] => {
  const out: string[] = []
  let cur = ''
  let depth = 0
  let quote = ''
  for (const ch of str) {
    if (quote) {
      if (ch === quote) quote = ''
    } else if (ch === '"' || ch === "'") quote = ch
    else if (ch === '(' || ch === '[') depth++
    else if (ch === ')' || ch === ']') depth = Math.max(0, depth - 1)
    else if (ch === ',' && depth === 0) {
      out.push(cur)
      cur = ''
      continue
    }
    cur += ch
  }
  out.push(cur)
  return out.map((s) => s.trim()).filter(Boolean)
}

/** First non-empty value among the aliases */
const getFirst = (sp: URLSearchParams, keys: readonly string[]): string | undefined => {
  for (const key of keys) {
    const value = sp.get(key)?.trim()
    if (value) return value
  }
  return undefined
}

/** All non-empty values among the aliases; supports repeated params and top-level comma lists */
const getList = (sp: URLSearchParams, keys: readonly string[]): string[] =>
  keys.flatMap((key) => sp.getAll(key).flatMap(splitTopLevel))

const escapeId = (id: string): string => id.replace(/[^\w-]/g, '\\$&').replace(/^(\d)/, '\\3$1 ')

const buildRange = (from?: string, to?: string): string[] =>
  from && to
    ? [`${AFTER}${from}${BEFORE}${to}`]
    : from
      ? [`${AFTER}${from}`]
      : to
        ? [`${BEFORE}${to}`]
        : []

/** Pure, easy to unit test */
const getCssSelectorsFromUrl = (url: URL): string[] => {
  const sp = url.searchParams

  const fromId = sp.get('from_id')?.trim()
  const toId = sp.get('to_id')?.trim()
  const ids = getList(sp, ['ids'])

  return [
    ...buildRange(
      fromId ? `#${escapeId(fromId)}` : undefined,
      toId ? `#${escapeId(toId)}` : undefined,
    ),
    ...ids.map((id) => `#${escapeId(id)}`),
    ...buildRange(getFirst(sp, PARAM_KEYS.fromSelector), getFirst(sp, PARAM_KEYS.toSelector)),
    ...getList(sp, PARAM_KEYS.selectors),
  ]
}

const toUrl = async (urlIn?: string): Promise<URL | null> => {
  if (!urlIn) return null
  try {
    return new URL(
      isStringURLEncoded({ str: urlIn }) ? urlIn : await getEncodedUrlParams({ url: urlIn }),
    )
  } catch {
    return null
  }
}

/**
 * @description
 * Higher Order Function that wraps an html loader (`func`) and narrows the loaded html
 * down to the parts selected by query params of the page url.
 *
 * How it works:
 * 1. Html source: if `params.html` is provided (even an empty string) it is used as is,
 *    otherwise `func(params, options)` is called to load it.
 * 2. Selector params are read from `params.url` (see the table below) and turned into css selectors.
 * 3. The matching blocks are extracted and concatenated into `html`.
 * 4. If the url has no selector params, the html is returned unchanged.
 * 5. If selectors are given but nothing matches, the full html is returned
 *    (set `options.fallbackToFullHtml: false` to get `''` instead).
 * 6. A missing or invalid url never throws; the html is returned unchanged.
 * 7. Other fields returned by `func` (for example `status`, `ok`) are preserved.
 *
 * Supported url params (all values may be percent-encoded):
 *
 * | Param                                  | Meaning                                              |
 * |----------------------------------------|------------------------------------------------------|
 * | `from_id`, `to_id`                     | Range by element id, both ends included              |
 * | `ids`                                  | Comma-separated element ids, picked one by one       |
 * | `from_s` / `from_sel` / `from_selector`| Range start as a css selector (included)             |
 * | `to_s` / `to_sel` / `to_selector`      | Range end as a css selector (included)               |
 * | `ss` / `sels` / `selectors`            | Comma-separated css selectors, picked one by one     |
 *
 * Rules:
 * - A range may be open-ended: only `from_*` means "from here to the end",
 *   only `to_*` means "from the start up to here".
 * - Aliases are equivalent; the first non-empty one wins for ranges, all are merged for lists.
 * - List params may be repeated (`ss=a&ss=b`). Commas inside `()`, `[]` or quotes
 *   are not treated as separators, so `a[href="x,y"]` and `:is(h2,h3)` work.
 * - Ids with special characters (`1abc`, `a.b`) are escaped automatically.
 * - Empty values (`?ids=`, `?ss=`) are ignored.
 * - Result order: id range, ids, selector range, selector list. List items keep the
 *   requested order, not the document order.
 *
 * @examples
 *   // Range by id (a_04 .. a_06, both included)
 *   https://example.com?from_id=a_04&to_id=a_06
 *
 *   // From a_08 to the end of the sibling run
 *   https://example.com?from_id=a_08
 *
 *   // From the start up to and including a_02
 *   https://example.com?to_id=a_02
 *
 *   // One block only (from and to are the same)
 *   https://example.com?from_id=a_07&to_id=a_07
 *
 *   // List of ids, in the requested order
 *   https://example.com?ids=a_04,a_05,a_06
 *   https://example.com?ids=a_06,a_04
 *
 *   // Nested elements and ids that need escaping
 *   https://example.com?ids=b_03,b_05
 *   https://example.com?ids=1abc,a.b
 *
 *   // Range by css selector
 *   https://example.com?from_s=section.c_04[aria-labelledby="Boris"]&to_s=section.c_06[aria-labelledby="Literary_features"]
 *   https://example.com?from_sel=section.c_04&to_sel=section.c_06
 *
 *   // Open-ended range by css selector
 *   https://example.com?from_s=section.c_08
 *   https://example.com?to_s=section.c_02
 *
 *   // List of css selectors (comma-separated or repeated)
 *   https://example.com?ss=h2,p.intro&ss=a[href="x,y"]
 *   https://example.com?sels=section.c_07
 *   https://example.com?ss=section.c_07&ss=section.c_09
 *
 *   // Commas inside :is() / [attr] are kept
 *   https://example.com?ss=section:is(.c_07,.c_08)
 *
 *   // Percent-encoded selectors
 *   https://example.com?from_s=section.c_04%5Baria-labelledby%3D%22Boris%22%5D&to_s=section.c_06
 *
 *   // Mixed: id range + ids + selector list are combined
 *   https://example.com?from_id=a_01&to_id=a_02&ids=a_09&ss=section.c_07
 *
 *   // No selector params: html returned unchanged
 *   https://example.com?foo=bar
 *
 *   // Nothing matches: full html returned (or '' with fallbackToFullHtml: false)
 *   https://example.com?ids=does_not_exist
 *
 * @usage
 *   import { withHtmlSelectorsPicker } from '../withHtmlSelectorsPicker/withHtmlSelectorsPicker'
 *
 *   const getHtmlPicked = withHtmlSelectorsPicker(getHtmlFromHtmlPage)
 *
 *   // load the page and keep only a_04..a_06
 *   const { html } = await getHtmlPicked({ url: 'https://example.com?from_id=a_04&to_id=a_06' })
 *
 *   // reuse already loaded html, no request is made
 *   const { html: htmlPicked } = await getHtmlPicked({ url, html: htmlLoaded })
 *
 *   // strict mode: empty html when nothing matched
 *   await getHtmlPicked({ url, html }, { fallbackToFullHtml: false })
 */
const withHtmlSelectorsPickerUnsafe: WithHtmlSelectorsPickerType =
  (func) =>
  async (params, optionsIn = {}) => {
    const { fallbackToFullHtml, ...funcOptions } = { ...optionsDefault, ...optionsIn }
    const { html: htmlIn, url: urlIn } = params

    let res: WithHtmlSelectorsPickerResType = { ...resDefault, html: htmlIn ?? '' }

    if (htmlIn === undefined) {
      res = { ...res, ...(await func(params, funcOptions)) }
    }

    const url = await toUrl(urlIn)
    const cssSelectorsArr = url ? getCssSelectorsFromUrl(url) : []
    if (!cssSelectorsArr.length) return res

    const blocks: GetHtmlBlockExtractedResType[] = await getHtmlBlocksExtracted({
      html: res.html,
      cssSelectorsArr,
    })

    const htmlPicked = blocks
      .map(({ html }) => html)
      .filter(Boolean)
      .join('')

    if (htmlPicked) return { ...res, html: htmlPicked }

    return fallbackToFullHtml ? res : { ...res, html: '' }
  }

type WithHtmlSelectorsPickerCaseType = {
  index: number
  description?: string
  func: (
    p: GetHtmlFromHtmlPageParamsType,
    o: GetHtmlFromHtmlPageOptionsType,
  ) => Promise<GetHtmlFromHtmlPageResType>
  params: WithHtmlSelectorsPickerParamsType
  paramsWithAssignedDate?: { timestamp: number }
  options?: WithHtmlSelectorsPickerOptionsType
  expected: WithHtmlSelectorsPickerResType
}

const withHtmlSelectorsPicker = withHtmlSelectorsPickerUnsafe

export type {
  WithHtmlSelectorsPickerCaseType,
  WithHtmlSelectorsPickerOptionsType,
  WithHtmlSelectorsPickerParamsType,
  WithHtmlSelectorsPickerResType,
  WithHtmlSelectorsPickerType,
}
export { withHtmlSelectorsPicker }
