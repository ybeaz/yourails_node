import { FileTypeEnum } from 'yourails_common'
import { GetWrittenFile3CaseType } from './getWrittenFile3'

export const getWrittenFile3Cases: GetWrittenFile3CaseType[] = [
  {
    description: 'save JSON object basic',
    params: {
      pathFileAbs:
        '/Users/admin/Dev/yourails_node/src/SharedNode/getWrittenFile3/__output__/text.json',
      data: { a: 1, b: 'b2', c: [null, 'b', 3] },
    },
    options: {},
    expected: {
      mediaType: 'text/plain',
      data: '',
      pathFileAbsOutput: '',
    },
  },
]
