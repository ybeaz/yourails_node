import { consoler } from './consoler'
import { consolerError } from './consolerError'

export type GetCommandExecutedAsyncParamsType = { command: string }

export type GetCommandExecutedAsyncResType = Promise<any>

interface GetCommandExecutedAsyncType {
  (params: GetCommandExecutedAsyncParamsType): GetCommandExecutedAsyncResType
}

/**
 * @description Function to getCommandExecutedAsync
 * @import import { getCommandExecutedAsync } from './getCommandExecutedAsync'
 */

export const getCommandExecutedAsync: GetCommandExecutedAsyncType = async ({ command }) => {
  if (typeof window !== 'undefined') return

  const { exec } = await import('child_process')

  return new Promise((resolve, reject) => {
    exec(command, { maxBuffer: 1024 * 500 }, (error: any, stdout, stderr) => {
      if (error) {
        consolerError('getCommandExecutedAsync', error)
        reject(error)
      } else resolve({ stdout, stderr })
    })
  })
}
