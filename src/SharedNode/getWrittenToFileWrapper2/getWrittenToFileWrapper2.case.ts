import { join } from 'node:path'
import { getDateString } from 'yourails_common'
import type {
  GetWrittenToFileWrapper2CaseType,
  GetWrittenToFileWrapper2ParamsType,
} from './getWrittenToFileWrapper2'

const dateString = getDateString({
  timestamp: new Date(),
  dash: true,
  hours: true,
  minutes: true,
  seconds: true,
  isUtcMethods: false,
})

export const getWrittenToFileWrapper2Cases: GetWrittenToFileWrapper2CaseType[] = [
  // {
  //   description: 'basic test getWrittenToFileWrapper2',
  //   params: {
  //     pathFileAbs: join(__dirname, '__output__', `${dateString}-temp.json`),
  //     dataArray: [
  //       { a: 1, b: 'b string', c: [1, 2, 3] },
  //       { a: 2, b: 'b2 string', c: [2, 3, 4] },
  //     ],
  //     isWritingDataJson: true,
  //     isWritingDataCsv: true,
  //   } as GetWrittenToFileWrapper2ParamsType,
  //   options: {},
  //   expected: { pathFileAbsJson: '', pathFileAbsCsv: '' },
  // },
  {
    description: 'basic test getWrittenToFileWrapper2',
    params: {
      pathFileAbs: join(__dirname, '__output__', `temp.json`),
      dataArray: [
        { a: 1, b: 'b string', c: [1, 2, 3] },
        { a: 2, b: 'b2 string', c: [2, 3, 4] },
        { a: 3, b: 'b3 string', c: [3, 3, 3] },
      ],
      isWritingDataJson: true,
      isWritingDataCsv: true,
    } as GetWrittenToFileWrapper2ParamsType,
    options: { mode: 'accumulateData', propKey: 'a' },
    expected: { pathFileAbsJson: '', pathFileAbsCsv: '' },
  },
  // {
  //   description: 'basic test getWrittenToFileWrapper2',
  //   params: {
  //     pathFileAbs: join(__dirname, '__output__', `${dateString}-temp.json`),
  //     dataArray: [
  //       { a: { f: 2, d: 'f' }, b: 'b string', c: [1, 2, 3] },
  //       { a: 2, b: 'b2 string', c: [2, 3, 4] },
  //     ],
  //     isDataJsonFlattened: false,
  //     isDataCsvFlattened: false,
  //     isWritingDataJson: true,
  //     isWritingDataCsv: true,
  //   } as GetWrittenToFileWrapper2ParamsType,
  //   options: {},
  //   expected: { pathFileAbsJson: '', pathFileAbsCsv: '' },
  // },
]
