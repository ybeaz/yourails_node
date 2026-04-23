import { mkdir } from 'node:fs/promises'

import { consoler } from './consoler'
import { consolerError } from './consolerError'
import { withTryCatchFinallyWrapper, FuncModeEnumType } from 'yourails_common'

interface GetEnsuredDirectoryType {
  ({ path }: { path: string }): Promise<string | undefined>
}

/**
 * @description Function to getEnsuredDirectory
 * @run npx tsx src/SharedNode/getEnsuredDirectory.ts
 * @import import { getEnsuredDirectory } from './getEnsuredDirectory'
 */
const getEnsuredDirectoryUnsafe: GetEnsuredDirectoryType = async ({ path }) => {
  if (typeof window !== 'undefined') return Promise.resolve(undefined)

  const res = await mkdir(path, { recursive: true })

  return res
}

export const getEnsuredDirectory = withTryCatchFinallyWrapper(getEnsuredDirectoryUnsafe, {
  optionsDefault: {},
  resDefault: false,
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
