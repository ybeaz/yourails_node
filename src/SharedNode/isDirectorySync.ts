import { consoler } from './consoler'
import { consolerError } from './consolerError'
import { withTryCatchFinallyWrapper, FuncModeEnumType } from 'yourails_common'

interface IsDirectorySyncType {
  (path: string): boolean
}

/**
 * @description Function to isDirectorySync
 * @run ts-node tools/isDirectorySync.ts
 * @import import { isDirectorySync } from './isDirectorySync'
 */
const isDirectorySyncUnsafe: IsDirectorySyncType = path => {
  if (typeof window !== 'undefined') return

  const fs = require('fs')
  const stats = fs.statSync(path)
  return stats.isDirectory()
}

export const isDirectorySync = withTryCatchFinallyWrapper(isDirectorySyncUnsafe, {
  optionsDefault: {},
  resDefault: false,
  isFinally: true,
  funcMode: FuncModeEnumType.server,
})

/**
 * @description Here the file is being run directly
 * @run ts-node src/SharedNode/isDirectorySync.ts
 */
if (require.main === module) {
  ;(async () => {
    const path =
      '/Users/admin/Dev/yourails-nestjs-server-4/cdkBotBuilding/2023-08-27-botFamily@contextual/__output__'
    const isDirectorySyncRes = await isDirectorySync(path)
    consoler('isDirectorySync [40]', { isDirectorySyncRes })
  })()
}
