import { join } from 'node:path'

export const getWaitedForFileCases = [
  {
    description: 'basic test getWaitedForFile',
    params: {
      pathFileAbs: join(__dirname, '__mocks__', 'test.json'),
      timeoutMs: 2500,
      minSizeBytes: 2,
      stableMs: 500,
      comment: '',
    },
    options: {},
    expected: join(__dirname, '__mocks__', 'test.json'),
  },
  {
    description: 'basic test getWaitedForFile',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForFile/__mocks__/test.json',
      timeoutMs: 2500,
      minSizeBytes: 10,
      stableMs: 500,
      comment: '',
    },
    options: {},
    expected: '/Users/admin/Dev/yourails_node/src/SharedNode/getWaitedForFile/__mocks__/test.json',
  },
]
