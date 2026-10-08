import * as cheerio from 'cheerio'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           [
             {
               index: 0,
               description: 'basic test getValidatedEntityLinksFilesReadable',
               params: {},
               options: {},
               expected: '',
             },
           ]
 */

type GetHtmlJsonLdExtractedParamsType = { html: string }

type GetHtmlJsonLdExtractedOptionsType = { funcParent?: string }

type GetHtmlJsonLdExtractedResType = unknown

type GetHtmlJsonLdExtractedType = (
  params: GetHtmlJsonLdExtractedParamsType,
  options?: GetHtmlJsonLdExtractedOptionsType,
) => GetHtmlJsonLdExtractedResType

const optionsDefault = {
  funcParent: 'getHtmlJsonLdExtracted',
} satisfies Required<GetHtmlJsonLdExtractedOptionsType>

const resDefault: GetHtmlJsonLdExtractedResType = ''

/**
 * @description Function to getHtmlJsonLdExtracted
 * @usage
   import { getHtmlJsonLdExtracted, GetHtmlJsonLdExtractedParamsType, GetHtmlJsonLdExtractedOptionsType } from './getHtmlJsonLdExtracted/getHtmlJsonLdExtracted'
   const getHtmlJsonLdExtractedParams: GetHtmlJsonLdExtractedParamsType = {}
   const getHtmlJsonLdExtractedOptions: GetHtmlJsonLdExtractedOptionsType = {}
   getHtmlJsonLdExtracted(getHtmlJsonLdExtractedParams, getHtmlJsonLdExtractedOptions)
*/
const getHtmlJsonLdExtractedUnsafe: GetHtmlJsonLdExtractedType = (
  { html }: GetHtmlJsonLdExtractedParamsType,
  options: GetHtmlJsonLdExtractedOptionsType = optionsDefault,
) => {
  const $ = cheerio.load(html)
  const result: Record<string, unknown>[] = []

  $('script[type="application/ld+json"]').each((_, element) => {
    const content = $(element).html()?.trim()

    if (!content) {
      return
    }

    try {
      const parsed = JSON.parse(content)

      if (Array.isArray(parsed)) {
        result.push(
          ...parsed.filter(
            (item): item is Record<string, unknown> => item !== null && typeof item === 'object',
          ),
        )
      } else if (parsed !== null && typeof parsed === 'object') {
        result.push(parsed)
      }
    } catch {
      // Ignore invalid JSON-LD blocks
    }
  })

  return result
}

const getHtmlJsonLdExtracted = withTryCatchFinallyWrapper<
  GetHtmlJsonLdExtractedParamsType,
  GetHtmlJsonLdExtractedOptionsType,
  GetHtmlJsonLdExtractedResType
>(getHtmlJsonLdExtractedUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetHtmlJsonLdExtractedCaseType = {
  index: number
  description?: string
  params: Parameters<typeof getHtmlJsonLdExtracted>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getHtmlJsonLdExtracted>[1]
  expected: ReturnType<typeof getHtmlJsonLdExtracted>
}

export type {
  GetHtmlJsonLdExtractedCaseType,
  GetHtmlJsonLdExtractedOptionsType,
  GetHtmlJsonLdExtractedParamsType,
  GetHtmlJsonLdExtractedResType,
  GetHtmlJsonLdExtractedType,
}
export { getHtmlJsonLdExtracted }
