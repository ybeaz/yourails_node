#!/usr/env node

import { withTryCatchFinallyWrapper } from 'yourails_common'
import { consoler } from './consoler'
import { consolerError } from './consolerError'
import { getSplitedStrDirFile } from 'yourails_common'

export type GetCopiedFileSyncParamsType = { src: string; dest: string }

export type GetCopiedFileSyncResType = void

interface GetCopiedFileSyncType {
  (params: GetCopiedFileSyncParamsType): GetCopiedFileSyncResType
}

/**
 * @description Function to getCopiedFileSync
 * @import import { getCopiedFileSync } from './getCopiedFileSync'
 */

export const getCopiedFileSync: GetCopiedFileSyncType = ({ src, dest }) => {
  if (typeof window !== 'undefined') return

  const ncp = require('ncp').ncp
  const fs = require('fs')

  const { dir } = getSplitedStrDirFile(dest)

  if (dir && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  ncp.clobber = true
  ncp.limit = 16
  ncp(src, dest, function (error: any) {
    if (error) {
      consolerError('getCopiedFileSync Error', error)
    }
  })
}

/**
 * @run ts-node tools/getCopiedFileSync.ts
 */
if (require.main === module) {
  const src = 'tools/getGems.ts'
  const dest = 'tools/getGems2.ts'
  getCopiedFileSync({ src, dest })
}
