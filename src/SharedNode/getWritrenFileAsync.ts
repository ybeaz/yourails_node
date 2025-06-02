import { withTryCatchFinallyWrapper } from 'yourails_common'
import { consoler } from './consoler'
import { consolerError } from './consolerError'

interface getWriteFileType {
  (pathFull: string, str: string): Promise<any>
}

/**
 * @description Function to getWritrenFileAsync
 * @run ts-node tools/getWritrenFileAsync.ts
 * @import import { getWritrenFileAsync } from './getWritrenFileAsync'
 */

export const getWritrenFileAsync: getWriteFileType = async (pathFull, str) => {
  if (typeof window !== 'undefined') return

  const { promises: fsa } = await import('fs')

  try {
    await fsa.writeFile(pathFull, str, 'utf-8')

    return str
  } catch (error) {
    consolerError('getWritrenFileAsync', error)
    return
  }
}

/* Something custom, perhaps to remove in the future */
const pathFull =
  '/Users/admin/Dev/react-ui-template-2021/botBuilding/2023-08-27-botFamily@contextual/output/openai_api-test.json'

export const getWritrenFilePathAsync = (str: string) => getWritrenFileAsync(pathFull, str)
