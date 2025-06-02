interface GetFilesListInDir {
  (directoryPath: string, extname: string): Promise<string[]>
}

/**
 * @description Function to find and create an array of files in the specified directory
 * @import import { getFilesListInDir } from './getFilesListInDir'
 */
export const getFilesListInDir: GetFilesListInDir = async (directoryPath, extname = '.js') => {
  if (typeof window !== 'undefined') return []

  const { promises: fsa } = await import('fs')
  const path = require('path')

  try {
    const files = await fsa.readdir(directoryPath)

    let filesOutput: string[] = files.filter(file => path.extname(file).toLowerCase() === extname)

    return filesOutput
  } catch (error: any) {
    console.info('getFilesListInDir [28: error]', { message: error.message })
    return []
  }
}
