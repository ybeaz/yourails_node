import { timeout } from 'yourails_common'

import { consoler } from './consoler'
import { consolerError } from './consolerError'

type GetWrittenJsonFileParamsType = {
  baseDir: string
  filePathParts: string[]
  data: any
}

type GetWrittenJsonFileOptionsType = { isOverwrite?: boolean }

type GetWrittenJsonFileResType = Promise<any>

interface GetWrittenJsonFileType {
  (
    params: GetWrittenJsonFileParamsType,
    options?: GetWrittenJsonFileOptionsType
  ): GetWrittenJsonFileResType
}

const optionsDefault: Required<GetWrittenJsonFileOptionsType> = {
  isOverwrite: true,
}

/*
  filePath = ''.join([baseDir, *filePathParts])
*/

/**
 * @description Function to write a JSON file
      baseDir str, base directpry for this task,
      filePathParts: List[str], list of part to build a path to a specific file
      objDict: dict, input dictionary, that we are going to save
 * @run ts-node src/Shared/getWrittenJsonFile.ts
 * @import import { getWrittenJsonFile, GetWrittenJsonFileParamsType } from '../tools/getWrittenJsonFile'
 */
const getWrittenJsonFile: GetWrittenJsonFileType = async (
  params: GetWrittenJsonFileParamsType,
  optionsIn: GetWrittenJsonFileOptionsType = optionsDefault
) => {
  if (typeof window !== 'undefined') return

  const fs = require('fs')
  const { promises: fsa } = await import('fs')

  const options: Required<GetWrittenJsonFileOptionsType> = {
    ...optionsDefault,
    ...optionsIn,
  }

  const { isOverwrite } = options

  const { baseDir, filePathParts, data } = params

  let output: any[] = []

  try {
    const filePath = [baseDir, ...filePathParts].join('/')

    const json = JSON.stringify(data, null, 2)

    if (fs.existsSync(filePath) && isOverwrite) {
      await fsa.unlink(filePath)
      await timeout(250)
    }

    await fsa.writeFile(filePath, json)

    output = data
  } catch (error: any) {
    consolerError('getWrittenJsonFile', error)
  } finally {
    return output
  }
}

export {
  getWrittenJsonFile,
  GetWrittenJsonFileParamsType,
  GetWrittenJsonFileOptionsType,
  GetWrittenJsonFileResType,
  GetWrittenJsonFileType,
}

/**
 * @description Here the file is being run directly
 */
if (require.main === module) {
  const input = { baseDir: '', filePathParts: [], data: {} }

  const output = getWrittenJsonFile(input)
  consoler('getWrittenJsonFile [61]', output)
}
