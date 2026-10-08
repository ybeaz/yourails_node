import type {
  GetPathFileWithSuffixCaseType,
  GetPathFileWithSuffixParamsType,
} from './getPathFileWithSuffix'

export const getPathFileWithSuffixCases: GetPathFileWithSuffixCaseType[] = [
  {
    description: 'basic test getPathFileWithSuffix - default options, single extension',
    params: { pathFileAbs: '/Users/admin/tmp/slide-01.png', suffix: 'temp' },
    options: {},
    expected: '/Users/admin/tmp/slide-01temp.png',
  },
  {
    description: 'with separator "." between stem and suffix',
    params: { pathFileAbs: '/Users/admin/tmp/slide-01.png', suffix: 'temp' },
    options: { separator: '.' },
    expected: '/Users/admin/tmp/slide-01.temp.png',
  },
  {
    description: 'with separator "-" between stem and suffix',
    params: { pathFileAbs: '/Users/admin/tmp/slide-01.png', suffix: 'compressed' },
    options: { separator: '-' },
    expected: '/Users/admin/tmp/slide-01-compressed.png',
  },
  {
    description: 'file with multiple dots in name (e.g. slide-01.final.png), separator "."',
    params: { pathFileAbs: '/Users/admin/tmp/slide-01.final.png', suffix: 'temp' },
    options: { separator: '.' },
    expected: '/Users/admin/tmp/slide-01.final.temp.png',
  },
  {
    description: 'file with no extension',
    params: { pathFileAbs: '/Users/admin/tmp/README', suffix: 'temp' },
    options: { separator: '.' },
    expected: '/Users/admin/tmp/README.temp',
  },
  {
    description: 'hidden/dotfile treated as extensionless by path.extname (e.g. .gitignore)',
    params: { pathFileAbs: '/Users/admin/tmp/.gitignore', suffix: 'temp' },
    options: { separator: '.' },
    expected: '/Users/admin/tmp/.gitignore.temp',
  },
  {
    description: 'empty suffix with separator "." still inserts separator',
    params: { pathFileAbs: '/Users/admin/tmp/slide-01.png', suffix: '' },
    options: { separator: '.' },
    expected: '/Users/admin/tmp/slide-01..png',
  },
  {
    description: 'empty suffix and empty separator returns original path unchanged',
    params: { pathFileAbs: '/Users/admin/tmp/slide-01.png', suffix: '' },
    options: { separator: '' },
    expected: '/Users/admin/tmp/slide-01.png',
  },
  {
    description: 'relative path input instead of absolute',
    params: { pathFileAbs: 'tmp/slide-01.png', suffix: 'temp' },
    options: { separator: '.' },
    expected: 'tmp/slide-01.temp.png',
  },
  {
    description: 'path with spaces in directory and filename',
    params: { pathFileAbs: '/Users/admin/My Project/slide 01.png', suffix: 'temp' },
    options: { separator: '.' },
    expected: '/Users/admin/My Project/slide 01.temp.png',
  },
  {
    description: 'nested deep directory structure',
    params: {
      pathFileAbs: '/Users/admin/Dev/yourails-nestjs-server-4/tmp/renders/slide-01.png',
      suffix: 'temp',
    },
    options: { separator: '.' },
    expected: '/Users/admin/Dev/yourails-nestjs-server-4/tmp/renders/slide-01.temp.png',
  },
  {
    description: 'suffix containing its own dots',
    params: { pathFileAbs: '/Users/admin/tmp/slide-01.png', suffix: 'v2.temp' },
    options: { separator: '.' },
    expected: '/Users/admin/tmp/slide-01.v2.temp.png',
  },
  {
    description: 'uppercase extension preserved as-is',
    params: { pathFileAbs: '/Users/admin/tmp/slide-01.PNG', suffix: 'temp' },
    options: { separator: '.' },
    expected: '/Users/admin/tmp/slide-01.temp.PNG',
  },
  {
    description: 'options omitted entirely - falls back to default separator (empty string)',
    params: { pathFileAbs: '/Users/admin/tmp/slide-01.png', suffix: 'temp' },
    expected: '/Users/admin/tmp/slide-01temp.png',
  },
]
