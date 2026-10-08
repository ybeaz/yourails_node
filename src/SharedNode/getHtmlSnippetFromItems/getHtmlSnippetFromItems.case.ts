import type {
  GetHtmlSnippetFromItemsCaseType,
  GetHtmlSnippetFromItemsParamsType,
} from './getHtmlSnippetFromItems'

const styleBase =
  '.items{margin:0;color:#24292f;line-height:2}.items-item{margin:0 0 0.35em}.items-item:last-child{margin-bottom:0}'

const styleUl = `<style>${styleBase}.items-ul{padding-left:1.25em;list-style:disc}.items-ul .items-item::marker{color:#0969da}</style>`
const styleOl = `<style>${styleBase}.items-ol{padding-left:1.5em;list-style:decimal}.items-ol .items-item::marker{color:#0969da}</style>`
const styleNone = `<style>${styleBase}.items-none{padding:0;list-style:none}</style>`

export const getHtmlSnippetFromItemsCases: GetHtmlSnippetFromItemsCaseType[] = [
  // --- contentType: default and explicit values ---
  {
    index: 0,
    description: 'basic test getHtmlSnippetFromItems: no options defaults to ul',
    params: { items: ['First point', 'Second point'] },
    options: {},
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">First point</li><li class="items-item">Second point</li></ul>`,
  },
  {
    index: 1,
    description: 'contentType ul explicitly',
    params: { items: ['First point', 'Second point'] },
    options: { contentType: 'ul' },
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">First point</li><li class="items-item">Second point</li></ul>`,
  },
  {
    index: 2,
    description: 'contentType ol renders <ol> with decimal style',
    params: { items: ['First point', 'Second point'] },
    options: { contentType: 'ol' },
    expected: `${styleOl}<ol class="items items-ol"><li class="items-item">First point</li><li class="items-item">Second point</li></ol>`,
  },
  {
    index: 3,
    description: 'contentType none renders <ul> with items-none class and no markers',
    params: { items: ['First point', 'Second point'] },
    options: { contentType: 'none' },
    expected: `${styleNone}<ul class="items items-none"><li class="items-item">First point</li><li class="items-item">Second point</li></ul>`,
  },
  {
    index: 4,
    description: 'contentType undefined is coerced to ul',
    params: { items: ['First point'] },
    options: { contentType: undefined },
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">First point</li></ul>`,
  },
  {
    index: 5,
    description: 'unknown contentType string is coerced to ul',
    params: { items: ['First point'] },
    options: { contentType: 'table' as never },
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">First point</li></ul>`,
  },
  {
    index: 6,
    description: 'contentType is case-sensitive: "OL" is invalid and coerced to ul',
    params: { items: ['First point'] },
    options: { contentType: 'OL' as never },
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">First point</li></ul>`,
  },
  {
    index: 7,
    description: 'contentType null is coerced to ul',
    params: { items: ['First point'] },
    options: { contentType: null as never },
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">First point</li></ul>`,
  },
  {
    index: 8,
    description: 'contentType matching an Object.prototype key ("toString") is coerced to ul',
    params: { items: ['First point'] },
    options: { contentType: 'toString' as never },
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">First point</li></ul>`,
  },
  {
    index: 9,
    description: 'contentType non-string (number) is coerced to ul',
    params: { items: ['First point'] },
    options: { contentType: 1 as never },
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">First point</li></ul>`,
  },

  // --- funcParent does not affect the output ---
  {
    index: 10,
    description: 'custom funcParent does not change the output',
    params: { items: ['First point'] },
    options: { funcParent: 'myParent' },
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">First point</li></ul>`,
  },
  {
    index: 11,
    description: 'funcParent undefined combined with contentType ol',
    params: { items: ['First point'] },
    options: { funcParent: undefined, contentType: 'ol' },
    expected: `${styleOl}<ol class="items items-ol"><li class="items-item">First point</li></ol>`,
  },

  // --- empty and whitespace-only input ---
  {
    index: 12,
    description: 'empty items array returns empty string',
    params: { items: [] },
    options: {},
    expected: '',
  },
  {
    index: 13,
    description: 'only empty and whitespace-only items returns empty string',
    params: { items: ['', '   ', '\t', '\n', ' \r\n '] },
    options: {},
    expected: '',
  },
  {
    index: 14,
    description: 'empty items with contentType ol still returns empty string (no style, no list)',
    params: { items: ['', '  '] },
    options: { contentType: 'ol' },
    expected: '',
  },

  // --- trimming and filtering ---
  {
    index: 15,
    description: 'items are trimmed on both ends',
    params: { items: ['  First point  ', '\tSecond point\n'] },
    options: {},
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">First point</li><li class="items-item">Second point</li></ul>`,
  },
  {
    index: 16,
    description: 'empty and whitespace-only items are skipped, order of the rest is preserved',
    params: { items: ['A', '', '   ', 'B', '\n', 'C'] },
    options: {},
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">A</li><li class="items-item">B</li><li class="items-item">C</li></ul>`,
  },
  {
    index: 17,
    description: 'inner whitespace and newlines are preserved, only the edges are trimmed',
    params: { items: ['  a   b  ', 'Line1\nLine2'] },
    options: {},
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">a   b</li><li class="items-item">Line1\nLine2</li></ul>`,
  },
  {
    index: 18,
    description: 'duplicate items are not deduplicated',
    params: { items: ['Same', 'Same'] },
    options: {},
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">Same</li><li class="items-item">Same</li></ul>`,
  },
  {
    index: 19,
    description: 'single item',
    params: { items: ['Only one'] },
    options: {},
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">Only one</li></ul>`,
  },

  // --- escaping ---
  {
    index: 20,
    description: 'HTML tags and double quotes are escaped',
    params: { items: ['<script>alert("x")</script>'] },
    options: {},
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;</li></ul>`,
  },
  {
    index: 21,
    description:
      'ampersand is escaped, and already-escaped entities are escaped again (no double-decode)',
    params: { items: ['Tom & Jerry', '&lt;b&gt;'] },
    options: {},
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">Tom &amp; Jerry</li><li class="items-item">&amp;lt;b&amp;gt;</li></ul>`,
  },
  {
    index: 22,
    description: 'single quote is escaped as &#39;',
    params: { items: ["Cannot be used at the script's top level"] },
    options: {},
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">Cannot be used at the script&#39;s top level</li></ul>`,
  },
  {
    index: 23,
    description: 'unicode and emoji are kept as is',
    params: { items: ['Привіт 🚀', 'こんにちは'] },
    options: {},
    expected: `${styleUl}<ul class="items items-ul"><li class="items-item">Привіт 🚀</li><li class="items-item">こんにちは</li></ul>`,
  },

  // --- realistic data ---
  {
    index: 24,
    description: 'realistic 5-item list with ol and an apostrophe',
    params: {
      items: [
        'Terminates current loop or switch statement',
        'Transfers control to the statement after the terminated one',
        'Can jump past a labeled statement',
        'Must be nested within the referenced label',
        "Cannot be used at the script's top level",
      ],
    },
    options: { contentType: 'ol' },
    expected: `${styleOl}<ol class="items items-ol"><li class="items-item">Terminates current loop or switch statement</li><li class="items-item">Transfers control to the statement after the terminated one</li><li class="items-item">Can jump past a labeled statement</li><li class="items-item">Must be nested within the referenced label</li><li class="items-item">Cannot be used at the script&#39;s top level</li></ol>`,
  },
]
