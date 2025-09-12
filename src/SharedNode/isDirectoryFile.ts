import { consoler } from './consoler'
import { consolerError } from './consolerError'
import { withTryCatchFinallyWrapper, FuncModeEnumType } from 'yourails_common'

type IsDirectoryFileParamsType = { path: string }
type IsDirectoryFileResType = {
  isError: boolean
  isExisting: boolean
  isDirectory: boolean
  isFile: boolean
}

interface IsDirectoryFileType {
  ({ path }: IsDirectoryFileParamsType): IsDirectoryFileResType
}

/**
 * @description Function to isDirectoryFile
 * @import import {
    isDirectoryFile,
    IsDirectoryFileParamsType,
    IsDirectoryFileResType 
  } from './isDirectoryFile'
 */
const isDirectoryFileUnsafe: IsDirectoryFileType = ({
  path,
}: IsDirectoryFileParamsType): IsDirectoryFileResType => {
  if (typeof window !== 'undefined')
    return { isError: true, isExisting: false, isDirectory: false, isFile: false }
  const fs = require('fs')
  let output = { isError: true, isExisting: false, isDirectory: false, isFile: false }
  try {
    const stats = fs.statSync(path)
    output = {
      isError: false,
      isExisting: !!stats,
      isDirectory: stats.isDirectory(),
      isFile: stats.isFile(),
    }
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      consolerError('isDirectoryFile [40]', error)
      output = { isError: true, isExisting: false, isDirectory: false, isFile: false }
    } else {
      // Handle other errors
      consolerError('isDirectoryFile [45]', error)
      output = { isError: true, isExisting: false, isDirectory: false, isFile: false }
    }
  } finally {
    return output
  }
}

const isDirectoryFile = withTryCatchFinallyWrapper(isDirectoryFileUnsafe, {
  optionsDefault: {},
  resDefault: false,
  isFinally: true,
  funcMode: FuncModeEnumType.server,
})

export { isDirectoryFile, IsDirectoryFileParamsType, IsDirectoryFileResType, IsDirectoryFileType }

/**
 * @description Here the file is being run directly
 * @run ts-node src/SharedNode/isDirectoryFile.ts
 */
if (require.main === module) {
  ;(async () => {
    type ExampleType = {
      params: IsDirectoryFileParamsType
      expected: IsDirectoryFileResType
    }
    const examples: ExampleType[] = [
      {
        params: { path: '/Users/admin/Dev/yourails_node/coverage' },
        expected: { isError: false, isExisting: true, isDirectory: true, isFile: false },
      },
      {
        params: { path: '/Users/admin/Dev/yourails_node/coverage2' },
        expected: { isError: true, isExisting: false, isDirectory: false, isFile: false },
      },
      {
        params: { path: '/Users/admin/Dev/yourails_node/coverage/lcov.info' },
        expected: { isError: false, isExisting: true, isDirectory: false, isFile: true },
      },
      {
        params: { path: '/Users/admin/Dev/yourails_node/coverage/lcov.json' },
        expected: { isError: true, isExisting: false, isDirectory: false, isFile: false },
      },
    ]

    const promises = examples.map(async (example: ExampleType, index: number) => {
      const { params, expected } = example

      const output = await isDirectoryFile(params)
      consoler(`isDirectoryFile [61-${index}]`, {
        params,
        expected,
        output,
        tested: JSON.stringify(output) === JSON.stringify(expected),
      })
    })
    await Promise.all(promises)
  })()
}
