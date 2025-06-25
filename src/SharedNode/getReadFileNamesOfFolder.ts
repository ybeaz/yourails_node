import { consoler } from 'yourails_common'
import {
  withTryCatchFinallyWrapper,
  FuncModeEnumType,
  WithTryCatchFinallyWrapperOptionsType,
} from 'yourails_common'

type GetReadFileNamesOfFolderParamsType = {
  path: string
}

type GetReadFileNamesOfFolderOptionsType = {
  funcParent?: string
  isHidden?: boolean
  includeExtensions?: string[]
}

type GetReadFileNamesOfFolderResType = any

interface GetReadFileNamesOfFolderType {
  (
    params: GetReadFileNamesOfFolderParamsType,
    options?: GetReadFileNamesOfFolderOptionsType
  ): GetReadFileNamesOfFolderResType
}

const optionsDefault: Required<GetReadFileNamesOfFolderOptionsType> = {
  funcParent: 'getReadFileNamesOfFolder',
  isHidden: false,
  includeExtensions: [],
}

const resDefault: GetReadFileNamesOfFolderResType = []

/**
 * @description Function to getReadFileNamesOfFolder
 * @import import { getReadFileNamesOfFolder } from './getReadFileNamesOfFolder'
 */

const getReadFileNamesOfFolderUnsafe: GetReadFileNamesOfFolderType = ({ path }, options) => {
  if (typeof window !== 'undefined') return

  const { isHidden, includeExtensions } = options ?? {}

  const fs = require('fs')
  const { Dirent } = require('fs')
  const files = fs.readdirSync(path, { withFileTypes: true })
  /* Filter for files (not directories) and return their names */
  let output = files
    .filter((dirent: typeof Dirent) => dirent.isFile())
    .map((dirent: typeof Dirent) => dirent.name)

  if (!isHidden) output = output.filter((name: string) => !name.startsWith('.'))

  if (includeExtensions?.length)
    output = output.filter((name: string) => {
      const extension = String(name).split('.').pop() || ''
      return includeExtensions.includes(extension)
    })

  return output
}

const getReadFileNamesOfFolder = withTryCatchFinallyWrapper(getReadFileNamesOfFolderUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export { getReadFileNamesOfFolder, getReadFileNamesOfFolderUnsafe }
export type {
  GetReadFileNamesOfFolderParamsType,
  GetReadFileNamesOfFolderOptionsType,
  GetReadFileNamesOfFolderResType,
  GetReadFileNamesOfFolderType,
}

/**
 * @description Here the file is being run directly
 * @run ts-node src/SharedNode/getReadFileNamesOfFolder.ts
 */
if (require.main === module) {
  ;(async () => {
    type ExampleType = {
      params: GetReadFileNamesOfFolderParamsType
      options: GetReadFileNamesOfFolderOptionsType
      expected: GetReadFileNamesOfFolderResType
    }
    const examples: ExampleType[] = [
      {
        params: {
          path: __dirname,
        },
        options: { includeExtensions: ['ts', 'json'] },
        expected: '',
      },
    ]

    const promises = examples.map((example: ExampleType, index: number) => {
      const { params, options, expected } = example

      const output = getReadFileNamesOfFolder(params, options)
      consoler(`getReadFileNamesOfFolder [61-${index}]`, {
        params,
        output,
        tested: JSON.stringify(output) === JSON.stringify(expected),
      })
    })
    await Promise.all(promises)
  })()
}
