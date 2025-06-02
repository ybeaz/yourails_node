import { consoler } from './consoler'
import { consolerError } from './consolerError'

interface getReadFileToStringType {
  (path: string): Promise<any>
}

/**
 * @description Function to getReadFileToString
 * @import import { getReadFileToString } from './getReadFileToString'
 */

export const getReadFileToString: getReadFileToStringType = async path => {
  if (typeof window !== 'undefined') return

  const { promises: fsa } = await import('fs')

  try {
    let getReadFileToStringRes = await fsa.readFile(path, 'utf8')
    getReadFileToStringRes = JSON.stringify(getReadFileToStringRes)

    return getReadFileToStringRes
  } catch (error) {
    consolerError('getReadFileToString', error)
    return
  }
}
