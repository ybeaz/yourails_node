export type GetCommandSpawnedAsyncParamsType = { command: string; args?: any[] }

export type GetCommandSpawnedAsyncResType = Promise<any>

interface GetCommandSpawnedAsyncType {
  (params: GetCommandSpawnedAsyncParamsType): GetCommandSpawnedAsyncResType
}

/**
 * @description Function to run commans from tools/getAppAsync.ts
 * @import import { getCommandSpawnedAsync } from './getCommandSpawnedAsync'
 */

export const getCommandSpawnedAsync: GetCommandSpawnedAsyncType = async ({ command, args }) => {
  if (typeof window !== 'undefined') return

  const { spawn } = await import('child_process')

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { shell: true })

    child.stdout.on('data', data => {
      console.log('stdout:', data.toString())
    })

    child.stderr.on('data', data => {
      console.log('stderr:', data.toString())
    })

    child.on('close', code => {
      console.log('child process exited with code', code)
      resolve(code) // You can resolve or reject based on your needs
    })

    child.on('error', error => {
      console.error('child process error:', error)
      reject(error)
    })
  })
}
