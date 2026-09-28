import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'
import { consoler } from '../consoler'
import { consolerError } from '../consolerError'
import {
  GetHtmlFromHtmlPageOptionsType,
  GetHtmlFromHtmlPageParamsType,
  getHtmlFromHtmlPage,
} from '../getHtmlFromHtmlPage/getHtmlFromHtmlPage'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           export const getHtmlPageToTextWithReadableCases: GetHtmlPageToTextWithReadableCaseType[] = [
             {
               index: 0,
               description: 'basic test getValidatedEntityLinksFilesReadable',
               params: {},
               options: {},
               expected: '',
             },
           ]
 */

type GetHtmlPageToTextWithReadableParamsType = { html?: string; url?: string }

type GetHtmlPageToTextWithReadableOptionsType = { url?: string; funcParent?: string }

type GetHtmlPageToTextWithReadableResType = {
  html: string
  text: string
  header: string
  htmlLen: number
  textLen: number
  headerLen: number
}

type GetHtmlPageToTextWithReadableType = (
  params: GetHtmlPageToTextWithReadableParamsType,
  options?: GetHtmlPageToTextWithReadableOptionsType,
) => Promise<GetHtmlPageToTextWithReadableResType>

const optionsDefault = {
  url: '',
  funcParent: 'getHtmlPageToTextWithReadable',
} satisfies Required<GetHtmlPageToTextWithReadableOptionsType>

const resDefault: GetHtmlPageToTextWithReadableResType = {
  html: '',
  text: '',
  header: '',
  htmlLen: 0,
  textLen: 0,
  headerLen: 0,
}

/**
 * @description Function to getHtmlPageToTextWithReadable
 * @usage
   import { getHtmlPageToTextWithReadable, GetHtmlPageToTextWithReadableParamsType, GetHtmlPageToTextWithReadableOptionsType, GetHtmlPageToTextWithReadableResType } from '../getHtmlPageToTextWithReadable/getHtmlPageToTextWithReadable'
   const getHtmlPageToTextWithReadableParams: GetHtmlPageToTextWithReadableParamsType = {}
   const getHtmlPageToTextWithReadableOptions: GetHtmlPageToTextWithReadableOptionsType = {}
   getHtmlPageToTextWithReadable(getHtmlPageToTextWithReadableParams, getHtmlPageToTextWithReadableOptions)
*/
const getHtmlPageToTextWithReadableUnsafe: GetHtmlPageToTextWithReadableType = async (
  { url: urlIn, html: htmlIn = '' }: GetHtmlPageToTextWithReadableParamsType,
  { url }: GetHtmlPageToTextWithReadableOptionsType = optionsDefault,
) => {
  let html = htmlIn

  if (!html && urlIn) {
    const getHtmlFromHtmlPageParams: GetHtmlFromHtmlPageParamsType = {
      url: urlIn,
    }
    const getHtmlFromHtmlPageOptions: GetHtmlFromHtmlPageOptionsType = {}
    const { html: htmlLoaded } = await getHtmlFromHtmlPage(
      getHtmlFromHtmlPageParams,
      getHtmlFromHtmlPageOptions,
    )
    html = htmlLoaded
  } else if (!html && !urlIn) {
    console.info('\n')
    consolerError(
      'getHtmlPageToTextWithReadable [70]',
      {
        case: `There is no url, nor html`,
        html: htmlIn,
        url: urlIn,
      },
      { isEnd: true },
    )
    return resDefault
  }

  const dom = new JSDOM(html, {
    ...(url ? { url } : {}),
  })

  const reader = new Readability(dom.window.document)
  const article = reader.parse()

  // Remove
  // if (article) {
  //   consoler('getHtmlPageToTextWithReadable [57]', article.textContent)
  //   consoler('getHtmlPageToTextWithReadable [58]', article.title)
  // }

  return {
    html,
    text: article?.textContent || '',
    header: article?.title || '',
    htmlLen: html?.length,
    textLen: (article?.textContent || '').length,
    headerLen: (article?.title || '').length,
  }
}

type GetHtmlPageToTextWithReadableCaseType = {
  index: number
  description?: string
  params: Parameters<typeof getHtmlPageToTextWithReadable>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getHtmlPageToTextWithReadable>[1]
  expected: ReturnType<typeof getHtmlPageToTextWithReadable>
}

const getHtmlPageToTextWithReadable = withTryCatchFinallyWrapper<
  GetHtmlPageToTextWithReadableParamsType,
  GetHtmlPageToTextWithReadableOptionsType,
  GetHtmlPageToTextWithReadableResType
>(getHtmlPageToTextWithReadableUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export type {
  GetHtmlPageToTextWithReadableCaseType,
  GetHtmlPageToTextWithReadableOptionsType,
  GetHtmlPageToTextWithReadableParamsType,
  GetHtmlPageToTextWithReadableResType,
  GetHtmlPageToTextWithReadableType,
}
export { getHtmlPageToTextWithReadable }
