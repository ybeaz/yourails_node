import { join } from 'node:path'
import scenario from './__mocks__/scenario.json'
import type {
  GetValidatedEntityLinksFilesReadableCaseType,
  GetValidatedEntityLinksFilesReadableParamsType,
} from './getValidatedEntityLinksFilesReadable'

export const getValidatedEntityLinksFilesReadableCases: GetValidatedEntityLinksFilesReadableCaseType[] =
  [
    // ── Real scenario examples ───────────────────────────────────────────────────────

    {
      description: 'real scenario example',
      mockReadablePaths: [],
      params: {
        schema: {
          pathFileAbsDescriptionExt: true,
          pathFileAbsTitleRaw: true,
          pathFileAbsTitle: true,
          pathFileAbsThumbnail: true,
          scenes: [
            {
              pathFileAbsImageFinal: true,
              pathsFilesAbsImages: [true],
              pathFileAbsAudio: true,
            },
          ],
        },
        entity: scenario,
      },
      options: {},
      expected: {},
    },

    // ── Empty / trivial ───────────────────────────────────────────────────────

    {
      description: 'empty schema and entity → empty result',
      mockReadablePaths: [],
      params: { schema: {}, entity: {} },
      options: {},
      expected: {},
    },

    // ── Single scalar prop ────────────────────────────────────────────────────

    {
      description: 'single schema prop, entity value readable → no failure',
      mockReadablePaths: ['/good/path/file.png'],
      params: {
        schema: { img: true },
        entity: { img: join(__dirname, '__mocks__', '/good/path/file.png') },
      },
      options: {},
      expected: {},
    },
    {
      description: 'single schema prop, entity value unreadable → prop recorded',
      mockReadablePaths: [],
      params: {
        schema: { img: true },
        entity: { img: '/bad/path/file.png' },
      },
      options: {},
      expected: { img: '/bad/path/file.png' },
    },
    {
      description: 'schema prop absent from entity (undefined) → skipped, no failure',
      mockReadablePaths: [],
      params: {
        schema: { img: true },
        entity: {},
      },
      options: {},
      expected: {},
    },
    {
      description: 'entity prop not present in schema → ignored even if unreadable',
      mockReadablePaths: ['/good/path/file.png'],
      params: {
        schema: { img: true },
        entity: {
          img: join(__dirname, '__mocks__', '/good/path/file.png'),
          extra: '/bad/unlisted.png',
        },
      },
      options: {},
      expected: {},
    },
    {
      description:
        'entity value is a non-string (number) for schema true prop → access throws → recorded',
      mockReadablePaths: [],
      params: {
        schema: { propA: true },
        entity: { propA: 5 },
      },
      options: {},
      expected: { propA: 5 },
    },

    // ── Multiple scalar props ─────────────────────────────────────────────────

    {
      description: 'multiple schema props, all readable → empty result',
      mockReadablePaths: ['/path/a.png', '/path/b.json'],
      params: {
        schema: { propA: true, propB: true },
        entity: {
          propA: join(__dirname, '__mocks__', '/path/a.png'),
          propB: join(__dirname, '__mocks__', '/path/b.json'),
        },
      },
      options: {},
      expected: {},
    },
    {
      description: 'multiple schema props, one unreadable → only failing prop in result',
      mockReadablePaths: ['/path/a.png'],
      params: {
        schema: { propA: true, propB: true },
        entity: { propA: join(__dirname, '__mocks__', '/path/a.png'), propB: '/bad/b.json' },
      },
      options: {},
      expected: { propB: '/bad/b.json' },
    },
    {
      description: 'multiple schema props, all unreadable → all recorded',
      mockReadablePaths: [],
      params: {
        schema: { propA: true, propB: true },
        entity: { propA: '/bad/a.png', propB: '/bad/b.json' },
      },
      options: {},
      expected: { propA: '/bad/a.png', propB: '/bad/b.json' },
    },
    {
      description:
        'schema has prop02, entity is missing it → only missing prop skipped, others still checked',
      mockReadablePaths: [],
      params: {
        schema: { propA: true, propB: true },
        entity: { propA: '/bad/a.png' }, // propB absent
      },
      options: {},
      expected: { propA: '/bad/a.png' }, // propB not in result
    },

    // ── Array of paths schema: [true] ────────────────────────────────────────────

    {
      description: '[true] schema, all paths readable → no failure',
      mockReadablePaths: ['/path/a.png', '/path/b.png'],
      params: {
        schema: { files: [true] },
        entity: {
          files: [
            join(__dirname, '__mocks__', '/path/a.png'),
            join(__dirname, '__mocks__', '/path/b.png'),
          ],
        },
      },
      options: {},
      expected: {},
    },
    {
      description: '[true] schema, one path unreadable → only failing path in result array',
      mockReadablePaths: ['/path/a.png'],
      params: {
        schema: { files: [true] },
        entity: { files: [join(__dirname, '__mocks__', '/path/a.png'), '/bad/b.png'] },
      },
      options: {},
      expected: { files: ['/bad/b.png'] },
    },
    {
      description: '[true] schema, all paths unreadable → all recorded in result array',
      mockReadablePaths: [],
      params: {
        schema: { files: [true] },
        entity: { files: ['/bad/a.png', '/bad/b.png'] },
      },
      options: {},
      expected: { files: ['/bad/a.png', '/bad/b.png'] },
    },
    {
      description: '[true] schema, empty entity array → no failure',
      mockReadablePaths: [],
      params: {
        schema: { files: [true] },
        entity: { files: [] },
      },
      options: {},
      expected: {},
    },
    {
      description: '[true] schema, entity value is not an array → silently skipped',
      mockReadablePaths: [],
      params: {
        schema: { files: [true] },
        entity: { files: '/bad/a.png' },
      },
      options: {},
      expected: {},
    },
    {
      description: '[true] schema nested inside array of objects, one path unreadable → recorded',
      mockReadablePaths: ['/path/a.png', '/path/b.png'],
      params: {
        schema: { items: [{ files: [true] }] },
        entity: {
          items: [
            {
              files: [
                join(__dirname, '__mocks__', '/path/a.png'),
                join(__dirname, '__mocks__', '/path/b.png'),
              ],
            }, // all readable
            { files: [join(__dirname, '__mocks__', '/path/a.png'), '/bad/c.png'] }, // one unreadable
          ],
        },
      },
      options: {},
      expected: { items: [{ files: ['/bad/c.png'] }] },
    },
    {
      description: '[true] schema nested inside array of objects, all items readable → no failure',
      mockReadablePaths: ['/path/a.png', '/path/b.png', '/path/c.png'],
      params: {
        schema: { items: [{ files: [true] }] },
        entity: {
          items: [
            {
              files: [
                join(__dirname, '__mocks__', '/path/a.png'),
                join(__dirname, '__mocks__', '/path/b.png'),
              ],
            },
            { files: [join(__dirname, '__mocks__', '/path/c.png')] },
          ],
        },
      },
      options: {},
      expected: {},
    },

    // ── Array schema ──────────────────────────────────────────────────────────

    {
      description: 'array schema, empty entity array → no failures',
      mockReadablePaths: [],
      params: {
        schema: { items: [{ file: true }] },
        entity: { items: [] },
      },
      options: {},
      expected: {},
    },
    {
      description: 'array schema, all items readable → no array in result',
      mockReadablePaths: ['/path/a.png', '/path/b.png'],
      params: {
        schema: { items: [{ file: true }] },
        entity: {
          items: [
            { file: join(__dirname, '__mocks__', '/path/a.png') },
            { file: join(__dirname, '__mocks__', '/path/b.png') },
          ],
        },
      },
      options: {},
      expected: {},
    },
    {
      description: 'array schema, one item unreadable → only that item in result array',
      mockReadablePaths: ['/path/a.png'],
      params: {
        schema: { items: [{ file: true }] },
        entity: {
          items: [{ file: join(__dirname, '__mocks__', '/path/a.png') }, { file: '/bad/b.png' }],
        },
      },
      options: {},
      expected: { items: [{ file: '/bad/b.png' }] },
    },
    {
      description: 'array schema, entity item missing the schema key → skipped (undefined guard)',
      mockReadablePaths: [],
      params: {
        schema: { items: [{ file: true }] },
        entity: { items: [{ other: join(__dirname, '__mocks__', '/some/path.png') }] },
      },
      options: {},
      expected: {},
    },
    {
      description: 'schema array but entity value is not an array → silently skipped',
      mockReadablePaths: [],
      params: {
        schema: { items: [{ file: true }] },
        entity: { items: 'not-an-array' },
      },
      options: {},
      expected: {},
    },

    // ── Array schema: merged item schema ─────────────────────────────────────

    {
      description:
        'array schema with multiple item-schema objects → merges keys, checks all on every item; partial item failure recorded',
      mockReadablePaths: ['/path/a.json', '/path/b.png', '/path/c.json'],
      params: {
        schema: { items: [{ fileA: true }, { fileB: true }] },
        entity: {
          items: [
            {
              fileA: join(__dirname, '__mocks__', '/path/a.json'),
              fileB: join(__dirname, '__mocks__', '/path/b.png'),
            }, // both readable
            { fileA: join(__dirname, '__mocks__', '/path/c.json'), fileB: '/bad/d.png' }, // fileB unreadable
          ],
        },
      },
      options: {},
      expected: { items: [{ fileB: '/bad/d.png' }] },
    },
    {
      description: 'merged array schema: both keys fail on the same item → both recorded',
      mockReadablePaths: [],
      params: {
        schema: { items: [{ fileA: true }, { fileB: true }] },
        entity: {
          items: [{ fileA: '/bad/a.json', fileB: '/bad/b.png' }],
        },
      },
      options: {},
      expected: { items: [{ fileA: '/bad/a.json', fileB: '/bad/b.png' }] },
    },

    // ── Nested object schema ──────────────────────────────────────────────────

    {
      description: 'nested object schema, inner value readable → no failure',
      mockReadablePaths: ['/good/path.png'],
      params: {
        schema: { nested: { file: true } },
        entity: { nested: { file: join(__dirname, '__mocks__', '/good/path.png') } },
      },
      options: {},
      expected: {},
    },
    {
      description:
        'nested object schema, inner value unreadable → failure bubbles up with full nesting',
      mockReadablePaths: [],
      params: {
        schema: { nested: { file: true } },
        entity: { nested: { file: '/bad/path.png' } },
      },
      options: {},
      expected: { nested: { file: '/bad/path.png' } },
    },

    // ── Docstring example (integration) ──────────────────────────────────────

    {
      description: 'docstring example: mixed props + array, one array item has unreadable path',
      mockReadablePaths: [
        '/my/path/image.png',
        'my/another/path/file.json',
        'my/some/path/image03.png',
        'my/another/path/file01.json',
        // 'my/some/path/image03.png' appears twice → still readable, OK
      ],
      params: {
        schema: {
          propName01: true,
          propName02: true,
          arrayName03: [{ propName03: true }, { propName04: true }],
        },
        entity: {
          propName01: join(__dirname, '__mocks__', '/my/path/image.png'),
          propName04: 5, // not in schema → ignored
          arrayName03: [
            {
              propName03: join(__dirname, '__mocks__', 'my/another/path/file.json'),
              propName04: join(__dirname, '__mocks__', 'my/some/path/image03.png'),
            },
            { propName06: 'not in schema - OK', propName04: 'my/wrong/path/doesNotExist06.png' },
            {
              propName03: join(__dirname, '__mocks__', 'my/another/path/file01.json'),
              propName04: join(__dirname, '__mocks__', 'my/some/path/image03.png'),
            },
          ],
        },
      },
      options: {},
      expected: {
        arrayName03: [{ propName04: 'my/wrong/path/doesNotExist06.png' }],
      },
    },
  ]
