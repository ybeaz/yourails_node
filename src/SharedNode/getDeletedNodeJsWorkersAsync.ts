import { consoler } from './consoler'
import { consolerError } from './consolerError'

export type GetDeletedNodeJsWorkersAsyncParamsType = {}

export type GetDeletedNodeJsWorkersAsyncResType = Promise<any>

interface GetDeletedNodeJsWorkersAsyncType {
  (params: GetDeletedNodeJsWorkersAsyncParamsType): GetDeletedNodeJsWorkersAsyncResType
}

/**
 * @description Function to terminate a worker process by calling the kill() method on the worker object
 * @run ts-node tools/getDeletedNodeJsWorkersAsync
 * @import import { getDeletedNodeJsWorkersAsync } from './getDeletedNodeJsWorkersAsync'
 */

export const getDeletedNodeJsWorkersAsync: GetDeletedNodeJsWorkersAsyncType = async (
  params = {}
) => {
  if (typeof window !== 'undefined') return

  const os = require('os')
  const cluster = require('cluster')
  const cpus = os.cpus()
  let workersPids: number[] = []

  try {
    if (cluster.isMaster) {
      for (const _ in cpus) {
        const worker = cluster.fork()
        setTimeout(() => {
          consoler('getDeletedNodeJsWorkersAsync, Killing worker', worker.process.pid)
          worker.kill()
        }, 2000)
        workersPids.push(worker.process.pid)
      }
    } else {
      consoler('getDeletedNodeJsWorkersAsync, Worker process killed', process.pid)
    }

    const res = workersPids
    return res
  } catch (error: any) {
    consolerError('getDeletedNodeJsWorkersAsync', error)
    return
  }
}

if (require.main === module) {
  console.log('This file is being run directly.')
  getDeletedNodeJsWorkersAsync({})
}
