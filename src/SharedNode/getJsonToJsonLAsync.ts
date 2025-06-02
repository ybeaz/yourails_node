import { consoler } from './consoler'
import { consolerError } from './consolerError'

import { getWritrenFileAsync } from './getWritrenFileAsync'

type GetJsonToJsonLAsyncParams = {
  pathIn: string
  pathOut: string
}

interface GetJsonToJsonLAsyncType {
  (params: GetJsonToJsonLAsyncParams): Promise<string>
}

/**
 * @description Function to getJsonToJsonLAsync
 * @import import { getJsonToJsonLAsync } from './getJsonToJsonLAsync'
 */

export const getJsonToJsonLAsync: GetJsonToJsonLAsyncType = async params => {
  if (typeof window !== 'undefined') return
  const { promises: fsa } = await import('fs')

  try {
    const { pathIn, pathOut } = params

    const readFileToStringRes = await fsa.readFile(pathIn, 'utf8')
    const replacedSpacesInString = readFileToStringRes?.replace(/([\n\s]+)+/g, ' ')
    const replacedSpacesInString2 = replacedSpacesInString?.replace(/^\[\s([\s\S]*?)\s\]\s$/g, '$1')
    const replacedSpacesInString3 = replacedSpacesInString2
      ?.split('}, { "messages":')
      .join('}\n{ "messages":')

    const res = await getWritrenFileAsync(pathOut, replacedSpacesInString3)

    return res
  } catch (error) {
    consolerError('getJsonToJsonLAsync', error)
    return
  }
}
