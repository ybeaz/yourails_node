import { FileTypeEnum } from 'yourails_common'
import { GetWrittenFile2CaseType } from './getWrittenFile2'

export const getWrittenFile2Cases: GetWrittenFile2CaseType[] = [
  {
    description: 'save JSON object basic',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/text.json',
      data: { a: 1, b: 'b2', c: [null, 'b', 3] },
    },
    options: {},
    expected: '{\n  "a": 1,\n  "b": "b2",\n  "c": [\n    null,\n    "b",\n    3\n  ]\n}',
  },

  {
    description: 'save TXT string basic',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/text.txt',
      data: 'Hello world from TXT file\nSecond line\nThird line',
    },
    options: { fileType: FileTypeEnum.txt },
    expected: `Hello world from TXT file
Second line
Third line`,
  },

  {
    description: 'save TXT from object (fallback JSON stringify)',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/object.txt',
      data: { hello: 'world', n: 123 },
    },
    options: {},
    expected: '{\n  "hello": "world",\n  "n": 123\n}',
  },

  {
    description: 'save TXT from object (fallback JSON stringify)',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/textUnicode.txt',
      data: `Hello world from getWrittenFile2
This is a second line
And this is a third line
Special chars: !@#$%^&*()
Unicode: 🚀🔥✨`,
    },
    options: {},
    expected:
      '"Hello world from getWrittenFile2\\nThis is a second line\\nAnd this is a third line\\nSpecial chars: !@#$%^&*()\\nUnicode: 🚀🔥✨"',
  },

  {
    description: 'save CSV array of objects basic',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/text.csv',
      data: [
        { name: 'John', age: 30, city: 'New York' },
        { name: 'Jane', age: 25, city: 'San Francisco' },
        { name: 'Bob', age: 40, city: 'Los Angeles' },
      ],
    },
    options: { fileType: FileTypeEnum.csv },
    expected:
      'name,age,city\n' +
      '"John",30,"New York"\n' +
      '"Jane",25,"San Francisco"\n' +
      '"Bob",40,"Los Angeles"',
  },

  {
    description: 'save JSON with overwrite enabled',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/overwrite.json',
      data: { overwrite: true },
    },
    options: { isOverwrite: true },
    expected: '{\n  "overwrite": true\n}',
  },

  {
    description: 'save CSV empty array',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile2/__output__/empty.csv',
      data: [],
    },
    options: { fileType: FileTypeEnum.csv },
    expected: '',
  },
]
