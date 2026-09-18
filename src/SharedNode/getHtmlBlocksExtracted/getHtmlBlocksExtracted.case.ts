import type {
  GetHtmlBlocksExtractedCaseType,
  GetHtmlBlocksExtractedParamsType,
} from './getHtmlBlocksExtracted'

const STRUGATSKY_HTML = `
<div>
  <section data-mw-section-id="0">Lead section</section>
  <section aria-labelledby="Life_and_work"><h2>Life and work</h2></section>
  <section data-mw-section-id="2" aria-labelledby="Arkady"><h2>Arkady</h2></section>
  <section aria-labelledby="Boris"><h2>Boris</h2></section>
  <section aria-labelledby="Artistic_origins">
    <h2>Artistic origins</h2>
    <section aria-labelledby="Cultural_and_social_context"><h3>Cultural and social context</h3></section>
    <section aria-labelledby="Work_in_tandem"><h3>Work in tandem</h3></section>
    <section aria-labelledby="Literary_technique"><h3>Literary technique</h3></section>
    <section aria-labelledby="Pretexts_and"><h3>Pretexts and</h3></section>
    <section aria-labelledby="Authorial_Narrative"><h3>Authorial narrative</h3></section>
    <section aria-labelledby="Themes"><h3>Themes</h3></section>
    <section aria-labelledby="Poetics"><h3>Poetics</h3></section>
    <section aria-labelledby="Characters"><h3>Characters</h3></section>
    <section aria-labelledby="Style_and_quotation"><h3>Style and quotation</h3></section>
    <section aria-labelledby="The_Strugatskys_and_Jewishness"><h3>The Strugatskys and Jewishness</h3></section>
  </section>
  <section aria-labelledby="Literary_features"><h2>Literary features</h2></section>
  <section aria-labelledby="See_also"><h2>See also</h2></section>
  <section aria-labelledby="Legacy_and_awards"><h2>Legacy and awards</h2></section>
  <section aria-labelledby="Notes"><h2>Notes</h2></section>
</div>
`

const SAMPLE_HTML = `
<div>
  <section data-mw-section-id="0">Lead</section>
  <section aria-labelledby="Life_and_work"><h2>Life and work</h2></section>
  <section aria-labelledby="Arkady"><h2>Arkady</h2></section>
  <section aria-labelledby="Boris"><h2>Boris</h2></section>
  <section aria-labelledby="See_also"><h2>See also</h2></section>
</div>
`

export const getHtmlBlocksExtractedCases: GetHtmlBlocksExtractedCaseType[] = [
  {
    index: 0,
    description: 'basic test getHtmlBlocksExtracted - single match',
    params: {
      html: '<div id="content"><h1 class="title">Hello World</h1></div>',
      cssSelectorsArr: ['#content > h1.title'],
    },
    options: {},
    expected: [
      {
        selector: '#content > h1.title',
        html: '<h1 class="title">Hello World</h1>',
        matchCount: 1,
      },
    ],
  },
  {
    index: 1,
    description: 'multiple selectors, each with a single match',
    params: {
      html: '<div id="content"><h1 class="header">Title</h1><div aria-labelledby="try_it">Section</div></div>',
      cssSelectorsArr: ['#content > h1.header', '#content > div[aria-labelledby="try_it"]'],
    },
    options: {},
    expected: [
      {
        selector: '#content > h1.header',
        html: '<h1 class="header">Title</h1>',
        matchCount: 1,
      },
      {
        selector: '#content > div[aria-labelledby="try_it"]',
        html: '<div aria-labelledby="try_it">Section</div>',
        matchCount: 1,
      },
    ],
  },
  {
    index: 2,
    description: 'selector with multiple matching elements returns array of html strings',
    params: {
      html: '<ul><li class="item">One</li><li class="item">Two</li><li class="item">Three</li></ul>',
      cssSelectorsArr: ['li.item'],
    },
    options: {},
    expected: [
      {
        selector: 'li.item',
        html: [
          '<li class="item">One</li>',
          '<li class="item">Two</li>',
          '<li class="item">Three</li>',
        ],
        matchCount: 3,
      },
    ],
  },
  {
    index: 3,
    description: 'selector with no matching elements returns null html and matchCount 0',
    params: {
      html: '<div id="content"><p>No headers here</p></div>',
      cssSelectorsArr: ['#content > h1.missing'],
    },
    options: {},
    expected: [
      {
        selector: '#content > h1.missing',
        html: null,
        matchCount: 0,
      },
    ],
  },
  {
    index: 4,
    description: 'empty html string returns no matches for any selector',
    params: {
      html: '',
      cssSelectorsArr: ['#content', '.title'],
    },
    options: {},
    expected: [
      { selector: '#content', html: null, matchCount: 0 },
      { selector: '.title', html: null, matchCount: 0 },
    ],
  },
  {
    index: 5,
    description: 'empty cssSelectorsArr returns empty result array',
    params: {
      html: '<div id="content"><h1>Hello</h1></div>',
      cssSelectorsArr: [],
    },
    options: {},
    expected: [],
  },
  {
    index: 6,
    description:
      'malformed CSS selector (unclosed attribute bracket) throws and returns error field',
    params: {
      html: '<div id="content"><h1>Hello</h1></div>',
      cssSelectorsArr: ['#content > div[aria-labelledby="try_it'],
    },
    options: {},
    expected: [
      {
        selector: '#content > div[aria-labelledby="try_it',
        html: null,
        matchCount: 0,
        error: "Invalid selector: Attribute value didn't end",
      },
    ],
  },
  {
    index: 7,
    description: 'nested element selector preserves inner HTML structure',
    params: {
      html: '<div id="content"><div class="wrapper"><span>Nested <b>bold</b> text</span></div></div>',
      cssSelectorsArr: ['#content > div.wrapper'],
    },
    options: {},
    expected: [
      {
        selector: '#content > div.wrapper',
        html: '<div class="wrapper"><span>Nested <b>bold</b> text</span></div>',
        matchCount: 1,
      },
    ],
  },
  {
    index: 8,
    description: 'custom options.funcParent value is accepted without affecting output shape',
    params: {
      html: '<div id="content"><h1 class="title">Hello</h1></div>',
      cssSelectorsArr: ['#content > h1.title'],
    },
    options: { funcParent: 'customCallerContext' },
    expected: [
      {
        selector: '#content > h1.title',
        html: '<h1 class="title">Hello</h1>',
        matchCount: 1,
      },
    ],
  },
  {
    index: 9,
    description: 'selector matching element with self-closing/void tag',
    params: {
      html: '<div id="content"><img src="pic.png" alt="test" /></div>',
      cssSelectorsArr: ['#content > img'],
    },
    options: {},
    expected: [
      {
        selector: '#content > img',
        html: '<img src="pic.png" alt="test">',
        matchCount: 1,
      },
    ],
  },
  {
    index: 10,
    description: 'mix of matching and non-matching selectors in the same call',
    params: {
      html: '<div id="content"><h1 class="title">Hi</h1></div>',
      cssSelectorsArr: ['#content > h1.title', '#content > p.missing'],
    },
    options: {},
    expected: [
      {
        selector: '#content > h1.title',
        html: '<h1 class="title">Hi</h1>',
        matchCount: 1,
      },
      { selector: '#content > p.missing', html: null, matchCount: 0 },
    ],
  },
  {
    index: 11,
    description:
      'BEFORE: selector returns all aria-labelledby sections preceding the target, in document order',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="syntax">Syntax</section>
        <section aria-labelledby="description">Description</section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: ["BEFORE:section[aria-labelledby='specifications']"],
    },
    options: {},
    expected: [
      {
        selector: "BEFORE:section[aria-labelledby='specifications']",
        html: [
          '<section aria-labelledby="intro">Intro</section>',
          '<section aria-labelledby="syntax">Syntax</section>',
          '<section aria-labelledby="description">Description</section>',
        ],
        matchCount: 3,
        usedFallback: false,
      },
    ],
  },
  {
    index: 12,
    description:
      'BEFORE: with target label not present in the HTML returns every labelled section (nothing to stop at, uses manual fallback)',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="syntax">Syntax</section>
      </div>`,
      cssSelectorsArr: ["BEFORE:section[aria-labelledby='does_not_exist']"],
    },
    options: {},
    expected: [
      {
        selector: "BEFORE:section[aria-labelledby='does_not_exist']",
        html: [
          '<section aria-labelledby="intro">Intro</section>',
          '<section aria-labelledby="syntax">Syntax</section>',
        ],
        matchCount: 2,
        usedFallback: true,
      },
    ],
  },
  {
    index: 13,
    description: 'BEFORE: with the target as the very first labelled section returns no matches',
    params: {
      html: `<div>
        <section aria-labelledby="specifications">Specs</section>
        <section aria-labelledby="see_also">See also</section>
      </div>`,
      cssSelectorsArr: ["BEFORE:section[aria-labelledby='specifications']"],
    },
    options: {},
    expected: [
      {
        selector: "BEFORE:section[aria-labelledby='specifications']",
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },
  {
    index: 14,
    description: 'BEFORE: with no aria-labelledby sections at all in the document',
    params: {
      html: '<div><p>No labelled sections here</p></div>',
      cssSelectorsArr: ["BEFORE:section[aria-labelledby='specifications']"],
    },
    options: {},
    expected: [
      {
        selector: "BEFORE:section[aria-labelledby='specifications']",
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },
  {
    index: 15,
    description:
      'BEFORE: with only one preceding section returns a single html string, not an array',
    params: {
      html: `<div>
        <section aria-labelledby="try_it">Try it</section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: ["BEFORE:section[aria-labelledby='specifications']"],
    },
    options: {},
    expected: [
      {
        selector: "BEFORE:section[aria-labelledby='specifications']",
        html: '<section aria-labelledby="try_it">Try it</section>',
        matchCount: 1,
        usedFallback: false,
      },
    ],
  },
  {
    index: 16,
    description:
      'BEFORE: target selector using double quotes instead of single quotes is still parsed correctly',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: ['BEFORE:section[aria-labelledby="specifications"]'],
    },
    options: {},
    expected: [
      {
        selector: 'BEFORE:section[aria-labelledby="specifications"]',
        html: '<section aria-labelledby="intro">Intro</section>',
        matchCount: 1,
        usedFallback: false,
      },
    ],
  },
  {
    index: 17,
    description:
      'BEFORE: target selector with an unparsable attribute pattern falls back to returning all sections (targetLabel is undefined)',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="syntax">Syntax</section>
      </div>`,
      cssSelectorsArr: ['BEFORE:.some-unrelated-class'],
    },
    options: {},
    expected: [
      {
        selector: 'BEFORE:.some-unrelated-class',
        html: [
          '<section aria-labelledby="intro">Intro</section>',
          '<section aria-labelledby="syntax">Syntax</section>',
        ],
        matchCount: 2,
        usedFallback: true,
      },
    ],
  },
  {
    index: 18,
    description: 'Mixed array: a standard selector alongside a BEFORE: selector in the same call',
    params: {
      html: `<div id="content">
        <h1>Title</h1>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: ['#content > h1', "BEFORE:section[aria-labelledby='specifications']"],
    },
    options: {},
    expected: [
      { selector: '#content > h1', html: '<h1>Title</h1>', matchCount: 1 },
      {
        selector: "BEFORE:section[aria-labelledby='specifications']",
        html: '<section aria-labelledby="intro">Intro</section>',
        matchCount: 1,
        usedFallback: false,
      },
    ],
  },
  {
    index: 19,
    description:
      'BEFORE: preserves nested HTML content of each matched section, not just top-level tags',
    params: {
      html: `<div>
        <section aria-labelledby="try_it"><h2>Try it</h2><p>Some <code>code</code> example.</p></section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: ["BEFORE:section[aria-labelledby='specifications']"],
    },
    options: {},
    expected: [
      {
        selector: "BEFORE:section[aria-labelledby='specifications']",
        html: '<section aria-labelledby="try_it"><h2>Try it</h2><p>Some <code>code</code> example.</p></section>',
        matchCount: 1,
        usedFallback: false,
      },
    ],
  },
  {
    index: 20,
    description:
      'BEFORE: with duplicate aria-labelledby="specifications" siblings, native :has() also matches the first duplicate itself (differs from manual fallback semantics)',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro 1</section>
        <section aria-labelledby="specifications">Specs A</section>
        <section aria-labelledby="specifications">Specs B (duplicate id, unusual but possible)</section>
      </div>`,
      cssSelectorsArr: ["BEFORE:section[aria-labelledby='specifications']"],
    },
    options: {},
    expected: [
      {
        selector: "BEFORE:section[aria-labelledby='specifications']",
        html: [
          '<section aria-labelledby="intro">Intro 1</section>',
          '<section aria-labelledby="specifications">Specs A</section>',
        ],
        matchCount: 2,
        usedFallback: false,
      },
    ],
  },
  {
    index: 21,
    description:
      'AFTER: selector returns all aria-labelledby sections following the target, in document order',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="syntax">Syntax</section>
        <section aria-labelledby="description">Description</section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: ["AFTER:section[aria-labelledby='syntax']"],
    },
    options: {},
    expected: [
      {
        selector: "AFTER:section[aria-labelledby='syntax']",
        html: [
          '<section aria-labelledby="description">Description</section>',
          '<section aria-labelledby="specifications">Specs</section>',
        ],
        matchCount: 2,
        usedFallback: true,
      },
    ],
  },
  {
    index: 22,
    description:
      'AFTER: with target label not present in the HTML returns no matches (foundTarget never flips true)',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="syntax">Syntax</section>
      </div>`,
      cssSelectorsArr: ["AFTER:section[aria-labelledby='does_not_exist']"],
    },
    options: {},
    expected: [
      {
        selector: "AFTER:section[aria-labelledby='does_not_exist']",
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },
  {
    index: 23,
    description: 'AFTER: with the target as the very last labelled section returns no matches',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: ["AFTER:section[aria-labelledby='specifications']"],
    },
    options: {},
    expected: [
      {
        selector: "AFTER:section[aria-labelledby='specifications']",
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },
  {
    index: 24,
    description:
      'AFTER: with only one following section returns a single html string, not an array',
    params: {
      html: `<div>
        <section aria-labelledby="syntax">Syntax</section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: ["AFTER:section[aria-labelledby='syntax']"],
    },
    options: {},
    expected: [
      {
        selector: "AFTER:section[aria-labelledby='syntax']",
        html: '<section aria-labelledby="specifications">Specs</section>',
        matchCount: 1,
        usedFallback: true,
      },
    ],
  },
  {
    index: 25,
    description: 'AFTER: with no aria-labelledby sections at all in the document',
    params: {
      html: '<div><p>No labelled sections here</p></div>',
      cssSelectorsArr: ["AFTER:section[aria-labelledby='syntax']"],
    },
    options: {},
    expected: [
      {
        selector: "AFTER:section[aria-labelledby='syntax']",
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },
  {
    index: 26,
    description:
      'AFTER: target selector with an unparsable attribute pattern returns no matches (opposite behavior from BEFORE: with the same case)',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="syntax">Syntax</section>
      </div>`,
      cssSelectorsArr: ['AFTER:.some-unrelated-class'],
    },
    options: {},
    expected: [
      {
        selector: 'AFTER:.some-unrelated-class',
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },
  {
    index: 27,
    description:
      'AFTER: preserves nested HTML content of each matched section, not just top-level tags',
    params: {
      html: `<div>
        <section aria-labelledby="syntax">Syntax</section>
        <section aria-labelledby="examples"><h2>Examples</h2><p>Some <code>code</code> here.</p></section>
      </div>`,
      cssSelectorsArr: ["AFTER:section[aria-labelledby='syntax']"],
    },
    options: {},
    expected: [
      {
        selector: "AFTER:section[aria-labelledby='syntax']",
        html: '<section aria-labelledby="examples"><h2>Examples</h2><p>Some <code>code</code> here.</p></section>',
        matchCount: 1,
        usedFallback: true,
      },
    ],
  },
  {
    index: 28,
    description:
      'AFTER: with duplicate target label, matching begins strictly after the FIRST occurrence (second occurrence itself is included in results)',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="specifications">Specs A</section>
        <section aria-labelledby="specifications">Specs B (duplicate id, unusual but possible)</section>
        <section aria-labelledby="see_also">See also</section>
      </div>`,
      cssSelectorsArr: ["AFTER:section[aria-labelledby='specifications']"],
    },
    options: {},
    expected: [
      {
        selector: "AFTER:section[aria-labelledby='specifications']",
        html: [
          '<section aria-labelledby="specifications">Specs B (duplicate id, unusual but possible)</section>',
          '<section aria-labelledby="see_also">See also</section>',
        ],
        matchCount: 2,
        usedFallback: true,
      },
    ],
  },
  {
    index: 29,
    description: 'Mixed array: a standard selector alongside an AFTER: selector in the same call',
    params: {
      html: `<div id="content">
        <h1>Title</h1>
        <section aria-labelledby="syntax">Syntax</section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: ['#content > h1', "AFTER:section[aria-labelledby='syntax']"],
    },
    options: {},
    expected: [
      { selector: '#content > h1', html: '<h1>Title</h1>', matchCount: 1 },
      {
        selector: "AFTER:section[aria-labelledby='syntax']",
        html: '<section aria-labelledby="specifications">Specs</section>',
        matchCount: 1,
        usedFallback: true,
      },
    ],
  },
  {
    index: 30,
    description:
      'AFTER:...BEFORE:... combined range returns sections strictly between both targets, in document order',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="try_it">Try it</section>
        <section aria-labelledby="syntax">Syntax</section>
        <section aria-labelledby="description">Description</section>
        <section aria-labelledby="examples">Examples</section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: [
        "AFTER:section[aria-labelledby='try_it']BEFORE:section[aria-labelledby='examples']",
      ],
    },
    options: {},
    expected: [
      {
        selector:
          "AFTER:section[aria-labelledby='try_it']BEFORE:section[aria-labelledby='examples']",
        html: [
          '<section aria-labelledby="syntax">Syntax</section>',
          '<section aria-labelledby="description">Description</section>',
        ],
        matchCount: 2,
        usedFallback: true,
      },
    ],
  },
  {
    index: 31,
    description:
      'AFTER:...BEFORE:... with adjacent targets (nothing between them) returns no matches',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="syntax">Syntax</section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: [
        "AFTER:section[aria-labelledby='intro']BEFORE:section[aria-labelledby='syntax']",
      ],
    },
    options: {},
    expected: [
      {
        selector: "AFTER:section[aria-labelledby='intro']BEFORE:section[aria-labelledby='syntax']",
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },
  {
    index: 32,
    description:
      'AFTER:...BEFORE:... where the AFTER target is not found in the document returns no matches (foundAfter never flips true)',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="syntax">Syntax</section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: [
        "AFTER:section[aria-labelledby='does_not_exist']BEFORE:section[aria-labelledby='specifications']",
      ],
    },
    options: {},
    expected: [
      {
        selector:
          "AFTER:section[aria-labelledby='does_not_exist']BEFORE:section[aria-labelledby='specifications']",
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },
  {
    index: 33,
    description:
      'AFTER:...BEFORE:... where the BEFORE target is not found returns everything from AFTER target to end of document',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="syntax">Syntax</section>
        <section aria-labelledby="description">Description</section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: [
        "AFTER:section[aria-labelledby='intro']BEFORE:section[aria-labelledby='does_not_exist']",
      ],
    },
    options: {},
    expected: [
      {
        selector:
          "AFTER:section[aria-labelledby='intro']BEFORE:section[aria-labelledby='does_not_exist']",
        html: [
          '<section aria-labelledby="syntax">Syntax</section>',
          '<section aria-labelledby="description">Description</section>',
          '<section aria-labelledby="specifications">Specs</section>',
        ],
        matchCount: 3,
        usedFallback: true,
      },
    ],
  },
  {
    index: 34,
    description:
      'AFTER:...BEFORE:... with an unparsable AFTER selector returns no matches, regardless of whether BEFORE would have matched',
    params: {
      html: `<div>
        <section aria-labelledby="intro">Intro</section>
        <section aria-labelledby="specifications">Specs</section>
      </div>`,
      cssSelectorsArr: [
        "AFTER:.some-unrelated-classBEFORE:section[aria-labelledby='specifications']",
      ],
    },
    options: {},
    expected: [
      {
        selector: "AFTER:.some-unrelated-classBEFORE:section[aria-labelledby='specifications']",
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },
  {
    index: 35,
    description:
      'AFTER:...BEFORE:... preserves nested HTML content of each matched section, not just top-level tags',
    params: {
      html: `<div>
        <section aria-labelledby="try_it">Try it</section>
        <section aria-labelledby="syntax"><h2>Syntax</h2><p>Some <code>code</code> here.</p></section>
        <section aria-labelledby="examples">Examples</section>
      </div>`,
      cssSelectorsArr: [
        "AFTER:section[aria-labelledby='try_it']BEFORE:section[aria-labelledby='examples']",
      ],
    },
    options: {},
    expected: [
      {
        selector:
          "AFTER:section[aria-labelledby='try_it']BEFORE:section[aria-labelledby='examples']",
        html: '<section aria-labelledby="syntax"><h2>Syntax</h2><p>Some <code>code</code> here.</p></section>',
        matchCount: 1,
        usedFallback: true,
      },
    ],
  },
  {
    index: 36,
    description: 'AFTER:...BEFORE:... target selectors using double quotes are parsed correctly',
    params: {
      html: `<div>
        <section aria-labelledby="try_it">Try it</section>
        <section aria-labelledby="syntax">Syntax</section>
        <section aria-labelledby="examples">Examples</section>
      </div>`,
      cssSelectorsArr: [
        'AFTER:section[aria-labelledby="try_it"]BEFORE:section[aria-labelledby="examples"]',
      ],
    },
    options: {},
    expected: [
      {
        selector:
          'AFTER:section[aria-labelledby="try_it"]BEFORE:section[aria-labelledby="examples"]',
        html: '<section aria-labelledby="syntax">Syntax</section>',
        matchCount: 1,
        usedFallback: true,
      },
    ],
  },
  {
    index: 37,
    description: 'standard CSS selector — single match by data-mw-section-id',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: ['section[data-mw-section-id="0"]'],
    },
    options: {},
    expected: [
      {
        selector: 'section[data-mw-section-id="0"]',
        html: '<section data-mw-section-id="0">Lead</section>',
        matchCount: 1,
      },
    ],
  },

  {
    index: 38,
    description: 'standard CSS selector — multiple matches returns array of html strings',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: ['section'],
    },
    options: {},
    expected: [
      {
        selector: 'section',
        html: [
          '<section data-mw-section-id="0">Lead</section>',
          '<section aria-labelledby="Life_and_work"><h2>Life and work</h2></section>',
          '<section aria-labelledby="Arkady"><h2>Arkady</h2></section>',
          '<section aria-labelledby="Boris"><h2>Boris</h2></section>',
          '<section aria-labelledby="See_also"><h2>See also</h2></section>',
        ],
        matchCount: 5,
      },
    ],
  },

  {
    index: 39,
    description: 'standard CSS selector — no matches returns null html and matchCount 0',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: ['section[data-mw-section-id="999"]'],
    },
    options: {},
    expected: [
      {
        selector: 'section[data-mw-section-id="999"]',
        html: null,
        matchCount: 0,
      },
    ],
  },

  {
    index: 40,
    description: 'standard CSS selector — malformed selector returns error field',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: ['section[data-mw-section-id='],
    },
    options: {},
    expected: [
      {
        selector: 'section[data-mw-section-id=',
        html: null,
        matchCount: 0,
        error: expect.stringContaining('Invalid selector'),
      },
    ],
  },

  {
    index: 41,
    description: 'BEFORE:<selector> — target has aria-labelledby (normal case)',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: ['BEFORE:section[aria-labelledby="Arkady"]'],
    },
    options: {},
    expected: [
      {
        selector: 'BEFORE:section[aria-labelledby="Arkady"]',
        html: [
          '<section data-mw-section-id="0">Lead</section>',
          '<section aria-labelledby="Life_and_work"><h2>Life and work</h2></section>',
        ],
        matchCount: 2,
        usedFallback: false,
      },
    ],
  },

  {
    index: 42,
    description: 'BEFORE:<selector> — target is the very first section (id=0), no aria-labelledby',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: ['BEFORE:section[data-mw-section-id="0"]'],
    },
    options: {},
    expected: [
      {
        selector: 'BEFORE:section[data-mw-section-id="0"]',
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },

  {
    index: 43,
    description:
      'AFTER:<selector> — regression test: target has NO aria-labelledby (the bug case). Must not return matchCount 0.',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: ['AFTER:section[data-mw-section-id="0"]'],
    },
    options: {},
    expected: [
      {
        selector: 'AFTER:section[data-mw-section-id="0"]',
        html: [
          '<section aria-labelledby="Life_and_work"><h2>Life and work</h2></section>',
          '<section aria-labelledby="Arkady"><h2>Arkady</h2></section>',
          '<section aria-labelledby="Boris"><h2>Boris</h2></section>',
          '<section aria-labelledby="See_also"><h2>See also</h2></section>',
        ],
        matchCount: 4,
        usedFallback: true,
      },
    ],
  },

  {
    index: 44,
    description: 'AFTER:<selA>BEFORE:<selB> — lead section through See_also',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: [
        'AFTER:section[data-mw-section-id="0"]BEFORE:section[aria-labelledby="See_also"]',
      ],
    },
    options: {},
    expected: [
      {
        selector: 'AFTER:section[data-mw-section-id="0"]BEFORE:section[aria-labelledby="See_also"]',
        html: [
          '<section aria-labelledby="Life_and_work"><h2>Life and work</h2></section>',
          '<section aria-labelledby="Arkady"><h2>Arkady</h2></section>',
          '<section aria-labelledby="Boris"><h2>Boris</h2></section>',
        ],
        matchCount: 3,
        usedFallback: true,
      },
    ],
  },

  {
    index: 45,
    description: 'AFTER:<selA>BEFORE:<selB> — afterSelector does not match anything at all',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: [
        'AFTER:section[data-mw-section-id="does-not-exist"]BEFORE:section[aria-labelledby="See_also"]',
      ],
    },
    options: {},
    expected: [
      {
        selector:
          'AFTER:section[data-mw-section-id="does-not-exist"]BEFORE:section[aria-labelledby="See_also"]',
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },

  {
    index: 46,
    description:
      'AFTER:<selA>BEFORE:<selB> — beforeSelector does not exist: should capture through to end of document',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: [
        'AFTER:section[aria-labelledby="Boris"]BEFORE:section[data-mw-section-id="does-not-exist"]',
      ],
    },
    options: {},
    expected: [
      {
        selector:
          'AFTER:section[aria-labelledby="Boris"]BEFORE:section[data-mw-section-id="does-not-exist"]',
        html: '<section aria-labelledby="See_also"><h2>See also</h2></section>',
        matchCount: 1,
        usedFallback: true,
      },
    ],
  },

  {
    index: 47,
    description:
      'AFTER:<selector> with trailing/leading whitespace around the selector is trimmed correctly',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: ['AFTER:  section[aria-labelledby="Arkady"]  '],
    },
    options: {},
    expected: [
      {
        selector: 'AFTER:  section[aria-labelledby="Arkady"]  ',
        html: [
          '<section aria-labelledby="Boris"><h2>Boris</h2></section>',
          '<section aria-labelledby="See_also"><h2>See also</h2></section>',
        ],
        matchCount: 2,
        usedFallback: true,
      },
    ],
  },

  {
    index: 48,
    description:
      'AFTER:<selA>BEFORE:<selB> — BEFORE selector appears BEFORE the AFTER selector in the document (inverted order)',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: [
        'AFTER:section[aria-labelledby="See_also"]BEFORE:section[aria-labelledby="Arkady"]',
      ],
    },
    options: {},
    expected: [
      {
        selector:
          'AFTER:section[aria-labelledby="See_also"]BEFORE:section[aria-labelledby="Arkady"]',
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },

  {
    index: 49,
    description: 'mixed batch — multiple selectors of different kinds in one call, order preserved',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: [
        'section[data-mw-section-id="0"]',
        'BEFORE:section[aria-labelledby="Boris"]',
        'AFTER:section[data-mw-section-id="0"]BEFORE:section[aria-labelledby="See_also"]',
        'section.does-not-exist',
      ],
    },
    options: {},
    expected: [
      {
        selector: 'section[data-mw-section-id="0"]',
        html: '<section data-mw-section-id="0">Lead</section>',
        matchCount: 1,
      },
      {
        selector: 'BEFORE:section[aria-labelledby="Boris"]',
        html: [
          '<section data-mw-section-id="0">Lead</section>',
          '<section aria-labelledby="Life_and_work"><h2>Life and work</h2></section>',
          '<section aria-labelledby="Arkady"><h2>Arkady</h2></section>',
        ],
        matchCount: 3,
        usedFallback: false,
      },
      {
        selector: 'AFTER:section[data-mw-section-id="0"]BEFORE:section[aria-labelledby="See_also"]',
        html: [
          '<section aria-labelledby="Life_and_work"><h2>Life and work</h2></section>',
          '<section aria-labelledby="Arkady"><h2>Arkady</h2></section>',
          '<section aria-labelledby="Boris"><h2>Boris</h2></section>',
        ],
        matchCount: 3,
        usedFallback: true,
      },
      { selector: 'section.does-not-exist', html: null, matchCount: 0 },
    ],
  },

  {
    index: 50,
    description: 'empty cssSelectorsArr returns empty results array',
    params: {
      html: SAMPLE_HTML,
      cssSelectorsArr: [],
    },
    options: {},
    expected: [],
  },

  {
    index: 51,
    description: 'empty html string with any selector returns matchCount 0, no throw',
    params: {
      html: '',
      cssSelectorsArr: ['section', 'AFTER:section[data-mw-section-id="0"]'],
    },
    options: {},
    expected: [
      { selector: 'section', html: null, matchCount: 0 },
      {
        selector: 'AFTER:section[data-mw-section-id="0"]',
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },
  {
    index: 52,
    description: 'AFTER_INCLUDE includes the selected section',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
        <section data-mw-section-id="2"><h2>Section 2</h2></section>
      `,
      cssSelectorsArr: ['AFTER_INCLUDE:section[data-mw-section-id="1"]'],
    },
    options: {},
    expected: [
      {
        selector: 'AFTER_INCLUDE:section[data-mw-section-id="1"]',
        html: [
          '<section data-mw-section-id="1"><h2>Section 1</h2></section>',
          '<section data-mw-section-id="2"><h2>Section 2</h2></section>',
        ],
        matchCount: 2,
        usedFallback: true,
      },
    ],
  },

  {
    index: 53,
    description: 'AFTER excludes the selected section',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
        <section data-mw-section-id="2"><h2>Section 2</h2></section>
      `,
      cssSelectorsArr: ['AFTER:section[data-mw-section-id="1"]'],
    },
    options: {},
    expected: [
      {
        selector: 'AFTER:section[data-mw-section-id="1"]',
        html: '<section data-mw-section-id="2"><h2>Section 2</h2></section>',
        matchCount: 1,
        usedFallback: true,
      },
    ],
  },

  {
    index: 54,
    description: 'BEFORE_INCLUDE includes the selected section',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
        <section data-mw-section-id="2"><h2>Section 2</h2></section>
      `,
      cssSelectorsArr: ['BEFORE_INCLUDE:section[data-mw-section-id="1"]'],
    },
    options: {},
    expected: [
      {
        selector: 'BEFORE_INCLUDE:section[data-mw-section-id="1"]',
        html: [
          '<section data-mw-section-id="0"><h2>Section 0</h2></section>',
          '<section data-mw-section-id="1"><h2>Section 1</h2></section>',
        ],
        matchCount: 2,
        usedFallback: true,
      },
    ],
  },

  {
    index: 55,
    description: 'BEFORE excludes the selected section',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
        <section data-mw-section-id="2"><h2>Section 2</h2></section>
      `,
      cssSelectorsArr: ['BEFORE:section[data-mw-section-id="1"]'],
    },
    options: {},
    expected: [
      {
        selector: 'BEFORE:section[data-mw-section-id="1"]',
        html: '<section data-mw-section-id="0"><h2>Section 0</h2></section>',
        matchCount: 1,
        usedFallback: false,
      },
    ],
  },

  {
    index: 56,
    description: 'AFTER_INCLUDE and BEFORE_INCLUDE include both boundary sections',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
        <section data-mw-section-id="2"><h2>Section 2</h2></section>
        <section data-mw-section-id="3"><h2>Section 3</h2></section>
      `,
      cssSelectorsArr: [
        'AFTER_INCLUDE:section[data-mw-section-id="1"]BEFORE_INCLUDE:section[data-mw-section-id="3"]',
      ],
    },
    options: {},
    expected: [
      {
        selector:
          'AFTER_INCLUDE:section[data-mw-section-id="1"]BEFORE_INCLUDE:section[data-mw-section-id="3"]',
        html: [
          '<section data-mw-section-id="1"><h2>Section 1</h2></section>',
          '<section data-mw-section-id="2"><h2>Section 2</h2></section>',
          '<section data-mw-section-id="3"><h2>Section 3</h2></section>',
        ],
        matchCount: 3,
        usedFallback: true,
      },
    ],
  },

  {
    index: 57,
    description: 'AFTER and BEFORE exclude both boundary sections',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
        <section data-mw-section-id="2"><h2>Section 2</h2></section>
        <section data-mw-section-id="3"><h2>Section 3</h2></section>
      `,
      cssSelectorsArr: [
        'AFTER:section[data-mw-section-id="1"]BEFORE:section[data-mw-section-id="3"]',
      ],
    },
    options: {},
    expected: [
      {
        selector: 'AFTER:section[data-mw-section-id="1"]BEFORE:section[data-mw-section-id="3"]',
        html: '<section data-mw-section-id="2"><h2>Section 2</h2></section>',
        matchCount: 1,
        usedFallback: true,
      },
    ],
  },

  {
    index: 58,
    description: 'AFTER_INCLUDE with BEFORE excludes only the before boundary',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
        <section data-mw-section-id="2"><h2>Section 2</h2></section>
        <section data-mw-section-id="3"><h2>Section 3</h2></section>
      `,
      cssSelectorsArr: [
        'AFTER_INCLUDE:section[data-mw-section-id="1"]BEFORE:section[data-mw-section-id="3"]',
      ],
    },
    options: {},
    expected: [
      {
        selector:
          'AFTER_INCLUDE:section[data-mw-section-id="1"]BEFORE:section[data-mw-section-id="3"]',
        html: [
          '<section data-mw-section-id="1"><h2>Section 1</h2></section>',
          '<section data-mw-section-id="2"><h2>Section 2</h2></section>',
        ],
        matchCount: 2,
        usedFallback: true,
      },
    ],
  },

  {
    index: 59,
    description:
      'AFTER excludes the after boundary and BEFORE_INCLUDE includes the before boundary',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
        <section data-mw-section-id="2"><h2>Section 2</h2></section>
        <section data-mw-section-id="3"><h2>Section 3</h2></section>
      `,
      cssSelectorsArr: [
        'AFTER:section[data-mw-section-id="1"]BEFORE_INCLUDE:section[data-mw-section-id="3"]',
      ],
    },
    options: {},
    expected: [
      {
        selector:
          'AFTER:section[data-mw-section-id="1"]BEFORE_INCLUDE:section[data-mw-section-id="3"]',
        html: [
          '<section data-mw-section-id="2"><h2>Section 2</h2></section>',
          '<section data-mw-section-id="3"><h2>Section 3</h2></section>',
        ],
        matchCount: 2,
        usedFallback: true,
      },
    ],
  },

  {
    index: 60,
    description: 'AFTER_INCLUDE and BEFORE with adjacent sections returns only after boundary',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
        <section data-mw-section-id="2"><h2>Section 2</h2></section>
      `,
      cssSelectorsArr: [
        'AFTER_INCLUDE:section[data-mw-section-id="1"]BEFORE:section[data-mw-section-id="2"]',
      ],
    },
    options: {},
    expected: [
      {
        selector:
          'AFTER_INCLUDE:section[data-mw-section-id="1"]BEFORE:section[data-mw-section-id="2"]',
        html: '<section data-mw-section-id="1"><h2>Section 1</h2></section>',
        matchCount: 1,
        usedFallback: true,
      },
    ],
  },

  {
    index: 61,
    description: 'AFTER and BEFORE_INCLUDE with adjacent sections returns only before boundary',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
        <section data-mw-section-id="2"><h2>Section 2</h2></section>
      `,
      cssSelectorsArr: [
        'AFTER:section[data-mw-section-id="1"]BEFORE_INCLUDE:section[data-mw-section-id="2"]',
      ],
    },
    options: {},
    expected: [
      {
        selector:
          'AFTER:section[data-mw-section-id="1"]BEFORE_INCLUDE:section[data-mw-section-id="2"]',
        html: '<section data-mw-section-id="2"><h2>Section 2</h2></section>',
        matchCount: 1,
        usedFallback: true,
      },
    ],
  },

  {
    index: 62,
    description: 'AFTER_INCLUDE with target as first section includes all sections',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
      `,
      cssSelectorsArr: ['AFTER_INCLUDE:section[data-mw-section-id="0"]'],
    },
    options: {},
    expected: [
      {
        selector: 'AFTER_INCLUDE:section[data-mw-section-id="0"]',
        html: [
          '<section data-mw-section-id="0"><h2>Section 0</h2></section>',
          '<section data-mw-section-id="1"><h2>Section 1</h2></section>',
        ],
        matchCount: 2,
        usedFallback: true,
      },
    ],
  },

  {
    index: 63,
    description: 'BEFORE_INCLUDE with target as last section includes all sections',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
      `,
      cssSelectorsArr: ['BEFORE_INCLUDE:section[data-mw-section-id="1"]'],
    },
    options: {},
    expected: [
      {
        selector: 'BEFORE_INCLUDE:section[data-mw-section-id="1"]',
        html: [
          '<section data-mw-section-id="0"><h2>Section 0</h2></section>',
          '<section data-mw-section-id="1"><h2>Section 1</h2></section>',
        ],
        matchCount: 2,
        usedFallback: true,
      },
    ],
  },

  {
    index: 64,
    description: 'AFTER_INCLUDE and BEFORE_INCLUDE with the same section returns that section',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
        <section data-mw-section-id="2"><h2>Section 2</h2></section>
      `,
      cssSelectorsArr: [
        'AFTER_INCLUDE:section[data-mw-section-id="1"]BEFORE_INCLUDE:section[data-mw-section-id="1"]',
      ],
    },
    options: {},
    expected: [
      {
        selector:
          'AFTER_INCLUDE:section[data-mw-section-id="1"]BEFORE_INCLUDE:section[data-mw-section-id="1"]',
        html: '<section data-mw-section-id="1"><h2>Section 1</h2></section>',
        matchCount: 1,
        usedFallback: true,
      },
    ],
  },

  {
    index: 65,
    description: 'AFTER_INCLUDE with nonexistent selector returns no sections',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
      `,
      cssSelectorsArr: ['AFTER_INCLUDE:section[data-mw-section-id="99"]'],
    },
    options: {},
    expected: [
      {
        selector: 'AFTER_INCLUDE:section[data-mw-section-id="99"]',
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },

  {
    index: 66,
    description: 'BEFORE_INCLUDE with nonexistent selector returns no sections',
    params: {
      html: `
        <section data-mw-section-id="0"><h2>Section 0</h2></section>
        <section data-mw-section-id="1"><h2>Section 1</h2></section>
      `,
      cssSelectorsArr: ['BEFORE_INCLUDE:section[data-mw-section-id="99"]'],
    },
    options: {},
    expected: [
      {
        selector: 'BEFORE_INCLUDE:section[data-mw-section-id="99"]',
        html: null,
        matchCount: 0,
        usedFallback: true,
      },
    ],
  },
]
