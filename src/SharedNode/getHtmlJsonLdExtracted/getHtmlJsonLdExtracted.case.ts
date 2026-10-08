import type {
  GetHtmlJsonLdExtractedCaseType,
  GetHtmlJsonLdExtractedParamsType,
} from './getHtmlJsonLdExtracted'

export const getHtmlJsonLdExtractedCases: GetHtmlJsonLdExtractedCaseType[] = [
  {
    index: 0,
    description: 'empty html returns no JSON-LD objects',
    params: {
      html: '',
    },
    options: {},
    expected: [],
  },
  {
    index: 1,
    description: 'html without application/ld+json script returns no objects',
    params: {
      html: '<html><head><title>Test</title></head><body><h1>Hello</h1></body></html>',
    },
    options: {},
    expected: [],
  },
  {
    index: 2,
    description: 'single valid JSON-LD object is extracted',
    params: {
      html: `
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Test Page"
          }
        </script>
      `,
    },
    options: {},
    expected: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Test Page',
      },
    ],
  },
  {
    index: 3,
    description: 'multiple valid JSON-LD objects from multiple script blocks are extracted',
    params: {
      html: `
        <script type="application/ld+json">
          {
            "@type": "WebPage",
            "name": "Page"
          }
        </script>
        <script type="application/ld+json">
          {
            "@type": "BreadcrumbList",
            "itemListElement": []
          }
        </script>
      `,
    },
    options: {},
    expected: [
      {
        '@type': 'WebPage',
        name: 'Page',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [],
      },
    ],
  },
  {
    index: 4,
    description: 'single JSON-LD array is flattened into result objects',
    params: {
      html: `
        <script type="application/ld+json">
          [
            {
              "@type": "WebPage",
              "name": "Page"
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": []
            }
          ]
        </script>
      `,
    },
    options: {},
    expected: [
      {
        '@type': 'WebPage',
        name: 'Page',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [],
      },
    ],
  },
  {
    index: 5,
    description: 'array JSON-LD keeps objects and ignores null and primitive values',
    params: {
      html: `
        <script type="application/ld+json">
          [
            {
              "@type": "WebPage"
            },
            null,
            "text",
            123,
            true,
            {
              "@type": "BreadcrumbList"
            }
          ]
        </script>
      `,
    },
    options: {},
    expected: [
      {
        '@type': 'WebPage',
      },
      {
        '@type': 'BreadcrumbList',
      },
    ],
  },
  {
    index: 6,
    description: 'invalid JSON-LD is ignored and valid JSON-LD blocks are still returned',
    params: {
      html: `
        <script type="application/ld+json">
          { invalid json }
        </script>
        <script type="application/ld+json">
          {
            "@type": "WebPage",
            "name": "Valid Page"
          }
        </script>
      `,
    },
    options: {},
    expected: [
      {
        '@type': 'WebPage',
        name: 'Valid Page',
      },
    ],
  },
  {
    index: 7,
    description: 'empty and whitespace-only JSON-LD script blocks are ignored',
    params: {
      html: `
        <script type="application/ld+json"></script>
        <script type="application/ld+json">   </script>
        <script type="application/ld+json">
          {
            "@type": "WebPage"
          }
        </script>
      `,
    },
    options: {},
    expected: [
      {
        '@type': 'WebPage',
      },
    ],
  },
  {
    index: 8,
    description: 'non-JSON-LD script blocks are ignored',
    params: {
      html: `
        <script type="application/json">
          {
            "ignored": true
          }
        </script>
        <script>
          console.log('ignored')
        </script>
        <script type="application/ld+json">
          {
            "@type": "WebPage"
          }
        </script>
      `,
    },
    options: {},
    expected: [
      {
        '@type': 'WebPage',
      },
    ],
  },
  {
    index: 9,
    description: 'valid JSON object with nested values is preserved',
    params: {
      html: `
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "JavaScript"
              }
            ],
            "metadata": {
              "source": "MDN",
              "active": true
            }
          }
        </script>
      `,
    },
    options: {},
    expected: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'JavaScript',
          },
        ],
        metadata: {
          source: 'MDN',
          active: true,
        },
      },
    ],
  },
  {
    index: 10,
    description: 'JSON-LD object containing null values is preserved',
    params: {
      html: `
        <script type="application/ld+json">
          {
            "@type": "WebPage",
            "description": null,
            "author": null
          }
        </script>
      `,
    },
    options: {},
    expected: [
      {
        '@type': 'WebPage',
        description: null,
        author: null,
      },
    ],
  },
  {
    index: 11,
    description: 'custom funcParent option does not change extracted JSON-LD result',
    params: {
      html: `
        <script type="application/ld+json">
          {
            "@type": "WebPage",
            "name": "Test"
          }
        </script>
      `,
    },
    options: {
      funcParent: 'customParent',
    },
    expected: [
      {
        '@type': 'WebPage',
        name: 'Test',
      },
    ],
  },
]
