import { consoler } from './consoler'
import { consolerError } from './consolerError'

interface GetCreatedFolderType {
  (path: string): Promise<any>
}

/**
 * @description Function to getCreatedFolder
 * @import import { getCreatedFolder } from './getCreatedFolder'
 */

export const getCreatedFolder: GetCreatedFolderType = async path => {
  if (typeof window !== 'undefined') return

  const { promises: fsa } = await import('fs')
  try {
    const getCreatedFolderRes = await fsa.mkdir(path)
    return getCreatedFolderRes
  } catch (error: any) {
    if (error.code === 'EEXIST') {
      consolerError('getCreatedFolder', 'Directory already exists.')
    } else {
      consolerError('getCreatedFolder', error) // Other error (e.g., permission issues)
    }
  }
}
