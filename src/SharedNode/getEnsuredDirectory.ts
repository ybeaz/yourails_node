import fs from 'node:fs'
import { dirname, extname } from 'node:path'

import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'
import { consoler } from './consoler'
import { consolerError } from './consolerError'

type GetEnsuredDirectoryType = ({ path }: { path: string }) => Promise<string | undefined>

/**
 * @description Function to getEnsuredDirectory
 * @run npx tsx src/SharedNode/getEnsuredDirectory.ts
 * @import import { getEnsuredDirectory } from './getEnsuredDirectory'
 */
const getEnsuredDirectoryUnsafe: GetEnsuredDirectoryType = async ({ path }) => {
  if (typeof window !== 'undefined') return Promise.resolve(undefined)

  const ext = extname(path)
  const dir = ext ? dirname(path) : path
  const output = fs.mkdirSync(dir, { recursive: true })
  return output
}

export const getEnsuredDirectory = withTryCatchFinallyWrapper(getEnsuredDirectoryUnsafe, {
  optionsDefault: {},
  resDefault: '',
  isFinally: true,
  funcMode: FuncModeEnumType.server,
})

/**
 * @description Here the file is being run directly
 * @run npx tsx src/SharedNode/getEnsuredDirectory.ts
 */
if (require.main === module) {
  ;(async () => {
    const path = '/Users/admin/Dev/yourails-nestjs-server-4/cdkMediaCrud/__output__/123'
    const GetEnsuredDirectoryRes = await getEnsuredDirectory({ path })
    consoler('getEnsuredDirectory [40]', { GetEnsuredDirectoryRes })
  })()
}
