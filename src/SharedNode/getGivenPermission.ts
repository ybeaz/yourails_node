import { getSplitedStrDirFile } from 'yourails_common'

export const getGivenPermission = (path: string) => {
  if (typeof window !== 'undefined') return

  const fs = require('fs')

  const { dir } = getSplitedStrDirFile(path)

  if (dir && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.chmodSync(path, 0o777)
}
