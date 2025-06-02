import { consoler } from '../SharedNode/consoler'
import { timeout } from 'yourails_common'
import { withTryCatchFinallyWrapper, FuncModeEnumType } from 'yourails_common'

type GetWrittenCsvFileParamsType = {
  baseDir: string
  filePathParts: string[]
  data: any
}

type GetWrittenCsvFileOptionsType = {
  fieldDelimiter?: string
  header?: any[]
  isOverwrite?: boolean
  funcParent?: string
}

type GetWrittenCsvFileResType = void

interface GetWrittenCsvFileType {
  (
    params: GetWrittenCsvFileParamsType,
    options?: GetWrittenCsvFileOptionsType
  ): GetWrittenCsvFileResType
}

const optionsDefault: Required<GetWrittenCsvFileOptionsType> = {
  fieldDelimiter: ';',
  header: [],
  isOverwrite: true,
  funcParent: 'getWrittenCsvFile',
}

/**
 * @description Function to getWrittenCsvFile
 * @import import { getWrittenCsvFile } from './getWrittenCsvFile'
 */

const getWrittenCsvFileUnsafe: GetWrittenCsvFileType = async (
  params: GetWrittenCsvFileParamsType,
  options?: GetWrittenCsvFileOptionsType
) => {
  if (typeof window !== 'undefined') return

  const fs = require('fs')
  const { promises: fsa } = await import('fs')

  const { baseDir, filePathParts, data } = params
  const { fieldDelimiter, header, isOverwrite } = options || optionsDefault

  const filePath = `${[baseDir, ...filePathParts].join('/')}`

  if (fs.existsSync(filePath) && isOverwrite) {
    await fsa.unlink(filePath)
    await timeout(250)
  } else if (fs.existsSync(filePath) && !isOverwrite) {
    return
  }

  const createCsvWriter = require('csv-writer').createObjectCsvWriter

  const csvWriter = createCsvWriter({
    path: filePath,
    fieldDelimiter,
    header,
  })

  await csvWriter.writeRecords(data).then(() => {
    consoler('getWrittenCsvFile [75]', '...done')
  })

  return
}

const getWrittenCsvFile = withTryCatchFinallyWrapper(getWrittenCsvFileUnsafe, {
  optionsDefault,
  resDefault: undefined,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export { getWrittenCsvFile, getWrittenCsvFileUnsafe }
export type {
  GetWrittenCsvFileParamsType,
  GetWrittenCsvFileOptionsType,
  GetWrittenCsvFileResType,
  GetWrittenCsvFileType,
}
/**
 * @description Here the file is being run directly
 * @run ts-node src/SharedNode/getWrittenCsvFile.ts
 */
if (require.main === module) {
  ;(async () => {
    const examples: {
      params: GetWrittenCsvFileParamsType
      options: GetWrittenCsvFileOptionsType
    }[] = [
      {
        params: {
          baseDir: __dirname,
          filePathParts: ['data.csv'],
          data: [
            { name: 'Bob', lang: 'French, English' },
            { name: 'Mary', lang: 'English' },
            { name: 'Huan', lang: 'Spanish' },
          ],
        },
        options: {
          fieldDelimiter: ';',
          header: [
            { id: 'name', title: 'NAME' },
            { id: 'lang', title: 'LANGUAGE' },
          ],
        },
      },
    ]

    examples.map(async (example: any, index: number) => {
      const { params, options, expected } = example

      await getWrittenCsvFile(params, options)
    })
  })()
}
