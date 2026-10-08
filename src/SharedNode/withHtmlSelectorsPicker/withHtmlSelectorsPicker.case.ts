import { getStringHtmlNormalizedWhitespace } from 'yourails_common'

import type {
  WithHtmlSelectorsPickerCaseType,
  WithHtmlSelectorsPickerParamsType,
  WithHtmlSelectorsPickerResType,
} from './withHtmlSelectorsPicker'

const STRUGATSKY_HTML = getStringHtmlNormalizedWhitespace(
  `
<div>
  <section id="a_01" class="c_01" data-mw-section-id="0">Lead section</section>
  <section id="a_02" class="c_02" aria-labelledby="Life_and_work"><h2>Life and work</h2></section>
  <section id="a_03" class="c_03" data-mw-section-id="2" aria-labelledby="Arkady"><h2>Arkady</h2></section>
  <section id="a_04" class="c_04" aria-labelledby="Boris"><h2>Boris</h2></section>
  <section id="a_05" class="c_05" aria-labelledby="Artistic_origins">
    <h2 id="b_01">Artistic origins</h2>
    <section id="b_02" aria-labelledby="Cultural_and_social_context"><h3>Cultural and social context</h3></section>
    <section id="b_03" aria-labelledby="Work_in_tandem"><h3>Work in tandem</h3></section>
    <section id="b_04" aria-labelledby="Literary_technique"><h3>Literary technique</h3></section>
    <section id="b_05" aria-labelledby="Pretexts_and"><h3>Pretexts and</h3></section>
    <section id="b_06" aria-labelledby="Authorial_Narrative"><h3>Authorial narrative</h3></section>
    <section id="b_07" aria-labelledby="Themes"><h3>Themes</h3></section>
    <section id="b_08" aria-labelledby="Poetics"><h3>Poetics</h3></section>
    <section id="b_09" aria-labelledby="Characters"><h3>Characters</h3></section>
    <section id="b_10" aria-labelledby="Style_and_quotation"><h3>Style and quotation</h3></section>
    <section id="b_11" aria-labelledby="The_Strugatskys_and_Jewishness"><h3>The Strugatskys and Jewishness</h3></section>
  </section>
  <section id="a_06" class="c_06" aria-labelledby="Literary_features"><h2>Literary features</h2></section>
  <section id="a_07" class="c_07" aria-labelledby="See_also"><h2>See also</h2></section>
  <section id="a_08" class="c_08" aria-labelledby="Legacy_and_awards"><h2>Legacy and awards</h2></section>
  <section id="a_09" class="c_09" aria-labelledby="Notes"><h2>Notes</h2></section>
</div>
`,
) as string

const STRUGATSKY_HTML_01 = getStringHtmlNormalizedWhitespace(
  `<section id="a_04" class="c_04" aria-labelledby="Boris"><h2>Boris</h2></section>
  <section id="a_05" class="c_05" aria-labelledby="Artistic_origins">
    <h2 id="b_01">Artistic origins</h2>
    <section id="b_02" aria-labelledby="Cultural_and_social_context"><h3>Cultural and social context</h3></section>
    <section id="b_03" aria-labelledby="Work_in_tandem"><h3>Work in tandem</h3></section>
    <section id="b_04" aria-labelledby="Literary_technique"><h3>Literary technique</h3></section>
    <section id="b_05" aria-labelledby="Pretexts_and"><h3>Pretexts and</h3></section>
    <section id="b_06" aria-labelledby="Authorial_Narrative"><h3>Authorial narrative</h3></section>
    <section id="b_07" aria-labelledby="Themes"><h3>Themes</h3></section>
    <section id="b_08" aria-labelledby="Poetics"><h3>Poetics</h3></section>
    <section id="b_09" aria-labelledby="Characters"><h3>Characters</h3></section>
    <section id="b_10" aria-labelledby="Style_and_quotation"><h3>Style and quotation</h3></section>
    <section id="b_11" aria-labelledby="The_Strugatskys_and_Jewishness"><h3>The Strugatskys and Jewishness</h3></section>
  </section>
  <section id="a_06" class="c_06" aria-labelledby="Literary_features"><h2>Literary features</h2></section>`,
) as string

const n = getStringHtmlNormalizedWhitespace

// --- Block fixtures (extend STRUGATSKY_HTML / STRUGATSKY_HTML_01 above) ---
const A01 = n(
  `<section id="a_01" class="c_01" data-mw-section-id="0">Lead section</section>`,
) as string
const A02 = n(
  `<section id="a_02" class="c_02" aria-labelledby="Life_and_work"><h2>Life and work</h2></section>`,
) as string
const A04 = n(
  `<section id="a_04" class="c_04" aria-labelledby="Boris"><h2>Boris</h2></section>`,
) as string
const A06 = n(
  `<section id="a_06" class="c_06" aria-labelledby="Literary_features"><h2>Literary features</h2></section>`,
) as string
const A07 = n(
  `<section id="a_07" class="c_07" aria-labelledby="See_also"><h2>See also</h2></section>`,
) as string
const A08 = n(
  `<section id="a_08" class="c_08" aria-labelledby="Legacy_and_awards"><h2>Legacy and awards</h2></section>`,
) as string
const A09 = n(
  `<section id="a_09" class="c_09" aria-labelledby="Notes"><h2>Notes</h2></section>`,
) as string
const B03 = n(
  `<section id="b_03" aria-labelledby="Work_in_tandem"><h3>Work in tandem</h3></section>`,
) as string
const B05 = n(
  `<section id="b_05" aria-labelledby="Pretexts_and"><h3>Pretexts and</h3></section>`,
) as string

// a_05 contains b_01..b_11, so it is the same slice as in STRUGATSKY_HTML_01 minus a_04 and a_06
const A05 = STRUGATSKY_HTML_01.slice(A04.length, STRUGATSKY_HTML_01.length - A06.length)

// Fixture for ids that need CSS escaping
const ESCAPE_HTML = n(
  `<div><p id="1abc">One</p><p id="a.b">Two</p><p id="c">Three</p></div>`,
) as string

const noFetch = async () => ({ html: '' })

export const withHtmlSelectorsPickerCases: WithHtmlSelectorsPickerCaseType[] = [
  // ───────────── existing cases ─────────────
  {
    index: 0,
    description: 'basic test withHtmlSelectorsPicker',
    func: async () => {
      return { html: '' }
    },
    params: {
      url: 'https://example.com?from_id=a_04&to_id=a_06',
      html: STRUGATSKY_HTML,
    } as WithHtmlSelectorsPickerParamsType,
    options: {},
    expected: {
      html: STRUGATSKY_HTML_01,
    } as WithHtmlSelectorsPickerResType,
  },
  {
    index: 1,
    description: 'basic test withHtmlSelectorsPicker',
    func: async () => {
      return { html: '' }
    },
    params: {
      url: 'https://example.com?ids=a_04,a_05,a_06',
      html: STRUGATSKY_HTML,
    } as WithHtmlSelectorsPickerParamsType,
    options: {},
    expected: {
      html: STRUGATSKY_HTML_01,
    } as WithHtmlSelectorsPickerResType,
  },
  {
    index: 2,
    description: 'basic test withHtmlSelectorsPicker',
    func: async () => {
      return { html: '' }
    },
    params: {
      url: 'https://example.com?from_s=section.c_04[aria-labelledby="Boris"]&to_s=section.c_06[aria-labelledby="Literary_features"]',
      html: STRUGATSKY_HTML,
    } as WithHtmlSelectorsPickerParamsType,
    options: {},
    expected: {
      html: STRUGATSKY_HTML_01,
    } as WithHtmlSelectorsPickerResType,
  },

  // ───────────── ranges (ids) ─────────────
  {
    index: 3,
    description: 'from_id only: everything from a_08 onwards',
    func: noFetch,
    params: { url: 'https://example.com?from_id=a_08', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: A08 + A09 },
  },
  {
    index: 4,
    description: 'to_id only: everything up to and including a_02',
    func: noFetch,
    params: { url: 'https://example.com?to_id=a_02', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: A01 + A02 },
  },
  {
    index: 5,
    description: 'from_id equals to_id: a single block',
    func: noFetch,
    params: { url: 'https://example.com?from_id=a_07&to_id=a_07', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: A07 },
  },

  // ───────────── ids list ─────────────
  {
    index: 6,
    description: 'single id',
    func: noFetch,
    params: { url: 'https://example.com?ids=a_07', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: A07 },
  },
  {
    index: 7,
    description: 'ids pointing to nested sections (b_*)',
    func: noFetch,
    params: { url: 'https://example.com?ids=b_03,b_05', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: B03 + B05 },
  },
  {
    index: 8,
    description: 'ids are returned in the order requested, not document order',
    func: noFetch,
    params: { url: 'https://example.com?ids=a_06,a_04', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: A06 + A04 },
  },
  {
    index: 9,
    description: '[v2] ids that need CSS escaping (leading digit, dot)',
    func: noFetch,
    params: { url: 'https://example.com?ids=1abc,a.b', html: ESCAPE_HTML },
    options: {},
    expected: { html: n(`<p id="1abc">One</p><p id="a.b">Two</p>`) as string },
  },

  // ───────────── css selectors ─────────────
  {
    index: 10,
    description: 'from_sel / to_sel aliases',
    func: noFetch,
    params: {
      url: 'https://example.com?from_sel=section.c_04&to_sel=section.c_06',
      html: STRUGATSKY_HTML,
    },
    options: {},
    expected: { html: STRUGATSKY_HTML_01 },
  },
  {
    index: 11,
    description: 'from_selector / to_selector aliases',
    func: noFetch,
    params: {
      url: 'https://example.com?from_selector=section.c_04&to_selector=section.c_06',
      html: STRUGATSKY_HTML,
    },
    options: {},
    expected: { html: STRUGATSKY_HTML_01 },
  },
  {
    index: 12,
    description: 'from_s only (open-ended range)',
    func: noFetch,
    params: { url: 'https://example.com?from_s=section.c_08', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: A08 + A09 },
  },
  {
    index: 13,
    description: 'to_s only (open-ended range)',
    func: noFetch,
    params: { url: 'https://example.com?to_s=section.c_02', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: A01 + A02 },
  },
  {
    index: 14,
    description: 'ss: comma-separated selector list',
    func: noFetch,
    params: {
      url: 'https://example.com?ss=section.c_07,section.c_08',
      html: STRUGATSKY_HTML,
    },
    options: {},
    expected: { html: A07 + A08 },
  },
  {
    index: 15,
    description: 'sels and selectors aliases',
    func: noFetch,
    params: {
      url: 'https://example.com?sels=section.c_07',
      html: STRUGATSKY_HTML,
    },
    options: {},
    expected: { html: A07 },
  },
  {
    index: 16,
    description: '[v2] repeated ss params are all used',
    func: noFetch,
    params: {
      url: 'https://example.com?ss=section.c_07&ss=section.c_09',
      html: STRUGATSKY_HTML,
    },
    options: {},
    expected: { html: A07 + A09 },
  },
  {
    index: 17,
    description: '[v2] commas inside :is() and [attr] are not split',
    func: noFetch,
    params: {
      url: 'https://example.com?ss=section:is(.c_07,.c_08)',
      html: STRUGATSKY_HTML,
    },
    options: {},
    expected: { html: A07 + A08 },
  },
  {
    index: 18,
    description: '[v2] empty ss alias falls through to the next alias',
    func: noFetch,
    params: {
      url: 'https://example.com?ss=&sels=section.c_07',
      html: STRUGATSKY_HTML,
    },
    options: {},
    expected: { html: A07 },
  },
  {
    index: 19,
    description: 'percent-encoded selectors in the url',
    func: noFetch,
    params: {
      url: `https://example.com?from_s=${encodeURIComponent(
        'section.c_04[aria-labelledby="Boris"]',
      )}&to_s=${encodeURIComponent('section.c_06[aria-labelledby="Literary_features"]')}`,
      html: STRUGATSKY_HTML,
    },
    options: {},
    expected: { html: STRUGATSKY_HTML_01 },
  },

  // ───────────── combinations ─────────────
  {
    index: 20,
    description: 'id range + ids list + selector list are combined',
    func: noFetch,
    params: {
      url: 'https://example.com?from_id=a_01&to_id=a_02&ids=a_09&ss=section.c_07',
      html: STRUGATSKY_HTML,
    },
    options: {},
    expected: { html: A01 + A02 + A09 + A07 },
  },

  // ───────────── nothing to select / nothing matched ─────────────
  {
    index: 21,
    description: 'url without selector params returns html unchanged',
    func: noFetch,
    params: { url: 'https://example.com?foo=bar', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: STRUGATSKY_HTML },
  },
  {
    index: 22,
    description: '[v2] empty ids/ss values are ignored, html unchanged',
    func: noFetch,
    params: { url: 'https://example.com?ids=&ss=', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: STRUGATSKY_HTML },
  },
  {
    index: 23,
    description: 'selectors match nothing: falls back to full html by default',
    func: noFetch,
    params: { url: 'https://example.com?ids=does_not_exist', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: STRUGATSKY_HTML },
  },
  {
    index: 24,
    description: '[v2] selectors match nothing with fallbackToFullHtml: false',
    func: noFetch,
    params: { url: 'https://example.com?ids=does_not_exist', html: STRUGATSKY_HTML },
    options: { fallbackToFullHtml: false },
    expected: { html: '' },
  },

  // ───────────── url edge cases ─────────────
  {
    index: 25,
    description: '[v2] missing url with html provided: html unchanged, no throw',
    func: noFetch,
    params: { url: '', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: STRUGATSKY_HTML },
  },
  {
    index: 26,
    description: '[v2] invalid url: html unchanged, no throw',
    func: noFetch,
    params: { url: 'not a url', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: STRUGATSKY_HTML },
  },

  // ───────────── html loading via func ─────────────
  {
    index: 27,
    description: 'html not provided: loaded via func, then filtered',
    func: async () => ({ html: STRUGATSKY_HTML }),
    params: { url: 'https://example.com?ids=a_04,a_05,a_06' },
    options: {},
    expected: { html: STRUGATSKY_HTML_01 },
  },
  {
    index: 28,
    description: '[v2] status and ok from func are preserved',
    func: async () => ({ html: STRUGATSKY_HTML, status: 200, ok: true }),
    params: { url: 'https://example.com?ids=a_07' },
    options: {},
    expected: { html: A07, status: 200, ok: true },
  },
  {
    index: 29,
    description: '[v2] failed load status is preserved and nothing is extracted',
    func: async () => ({ html: '', status: 404, ok: false }),
    params: { url: 'https://example.com?ids=a_07' },
    options: { fallbackToFullHtml: false },
    expected: { html: '', status: 404, ok: false },
  },
  {
    index: 30,
    description: '[v2] empty html string counts as provided: func is NOT called',
    func: async () => ({ html: STRUGATSKY_HTML }),
    params: { url: 'https://example.com?ids=a_07', html: '' },
    options: { fallbackToFullHtml: false },
    expected: { html: '' },
  },
  {
    index: 31,
    description: '[v2] empty options object still gets the default funcParent',
    // func only returns html if it received the default funcParent
    func: async (_p, o) => ({
      html: o?.funcParent === 'withHtmlSelectorsPicker' ? STRUGATSKY_HTML : '',
    }),
    params: { url: 'https://example.com?ids=a_09' },
    options: {},
    expected: { html: A09 },
  },
  {
    index: 32,
    description: 'custom funcParent is forwarded to func',
    func: async (_p, o) => ({
      html: o?.funcParent === 'customParent' ? STRUGATSKY_HTML : '',
    }),
    params: { url: 'https://example.com?ids=a_09' },
    options: { funcParent: 'customParent' },
    expected: { html: A09 },
  },
  {
    index: 33,
    description: '[v2] partial match: unmatched selectors are ignored, matched ones returned',
    func: noFetch,
    params: { url: 'https://example.com?ids=does_not_exist,a_07', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: A07 },
  },
  {
    index: 34,
    description: '[v2] selector (not id) matches nothing: falls back to full html',
    func: noFetch,
    params: { url: 'https://example.com?ss=section.c_99', html: STRUGATSKY_HTML },
    options: {},
    expected: { html: STRUGATSKY_HTML },
  },
  {
    index: 35,
    description: '[v2] range with unknown from_id and fallbackToFullHtml: false returns empty html',
    func: noFetch,
    params: { url: 'https://example.com?from_id=nope&to_id=a_06', html: STRUGATSKY_HTML },
    options: { fallbackToFullHtml: false },
    expected: { html: '' },
  },
]
