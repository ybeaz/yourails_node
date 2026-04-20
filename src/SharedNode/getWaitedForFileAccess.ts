import { promises as fsa } from 'fs'
import { consolerError } from './consolerError'

export const getWaitedForFileAccess = async (filePath: string, maxRetries = 10) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await fsa.access(filePath)
      return // Success
    } catch (error: any) {
      consolerError('getAppAsync [7]', { count: i })
      if (error.code === 'ENOENT' && i < maxRetries - 1) {
        await new Promise(r => setTimeout(r, 500))
        continue
      }
      throw error
    }
  }
}
