import { consoler } from './consoler'
import { consolerError } from './consolerError'

export type getCreatedNodeJsWorkersAsyncParamsType = {
  funcToRun?: any
  funcParams?: any
  funcOptions?: any
}

export type getCreatedNodeJsWorkersAsyncResType = Promise<any>

interface getCreatedNodeJsWorkersAsyncType {
  (params: getCreatedNodeJsWorkersAsyncParamsType): getCreatedNodeJsWorkersAsyncResType
}

/**
 * @description Function to use the os module to get information about the system, including the number of CPU cores. Then, the function uses this information to spawn worker processes accordingly
 * @run ts-node tools/getCreatedNodeJsWorkersAsync
 * @import import { getCreatedNodeJsWorkersAsync } from './getCreatedNodeJsWorkersAsync'
 */

export const getCreatedNodeJsWorkersAsync: getCreatedNodeJsWorkersAsyncType = async params => {
  if (typeof window !== 'undefined') return

  const { funcToRun, funcParams, funcOptions } = params

  const os = require('os')
  const cluster = require('cluster')

  const cpus = os.cpus()
  let workersPids: number[] = []

  try {
    if (cluster.isMaster) {
      console.info('getCreatedNodeJsWorkersAsync [31]', { cpus })

      for (const cpu in cpus) {
        const worker = cluster.fork()
        workersPids.push(worker.process.pid)
      }

      cluster.on('exit', (worker: any, code: any, signal: any) => {
        consoler(
          'getCreatedNodeJsWorkersAsync exit',
          `${worker.process.pid} exited and will be forked once again`
        )
        cluster.fork()
      })

      if (funcToRun) funcToRun(funcParams, funcOptions)
    } else {
      consoler('getCreatedNodeJsWorkersAsync', process.pid)
    }

    const res = workersPids

    return res
  } catch (error: any) {
    consolerError('getCreatedNodeJsWorkersAsync', error)
    return
  }
}

if (require.main === module) {
  console.log('This file is being run directly.')
  getCreatedNodeJsWorkersAsync({})
}
