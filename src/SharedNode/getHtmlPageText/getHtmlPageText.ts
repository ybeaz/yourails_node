import {
  FuncModeEnumType,
  GetHtmlToTextConvertOptionsType,
  GetHtmlToTextConvertParamsType,
  getHtmlToTextConvert,
  withTryCatchFinallyWrapper,
} from 'yourails_common'
import { consoler } from '../consoler'
import {
  GetHtmlBlockExtractedResType,
  GetHtmlBlocksExtractedOptionsType,
  GetHtmlBlocksExtractedParamsType,
  getHtmlBlocksExtracted,
} from '../getHtmlBlocksExtracted/getHtmlBlocksExtracted'
import {
  type GetHtmlFromHtmlPageCaseType,
  type GetHtmlFromHtmlPageOptionsType,
  type GetHtmlFromHtmlPageParamsType,
  getHtmlFromHtmlPage,
} from '../getHtmlFromHtmlPage/getHtmlFromHtmlPage'

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

type GetHtmlPageTextParamsType = {
  url: string
  cssSelectorsArr: string[]
}

type GetHtmlPageTextOptionsType = {
  isWaitingForLoad?: boolean
  isFlattenShadowDom?: boolean
  funcParent?: string
}

type GetHtmlPageTextResType = { html: string; text: string }

type GetHtmlPageTextType = (
  params: GetHtmlPageTextParamsType,
  options?: GetHtmlPageTextOptionsType,
) => Promise<GetHtmlPageTextResType>

const optionsDefault = {
  isWaitingForLoad: false,
  isFlattenShadowDom: false,
  funcParent: 'getHtmlPageText',
} satisfies Required<GetHtmlPageTextOptionsType>

const resDefault: GetHtmlPageTextResType = { html: '', text: '' }

/**
 * @description Function to getHtmlPageText
 * @usage
   import { getHtmlPageText, GetHtmlPageTextParamsType, GetHtmlPageTextOptionsType } from './getHtmlPageText/getHtmlPageText'
   const getHtmlPageTextParams: GetHtmlPageTextParamsType = {}
   const getHtmlPageTextOptions: GetHtmlPageTextOptionsType = {}
   getHtmlPageText(getHtmlPageTextParams, getHtmlPageTextOptions)
*/
const getHtmlPageTextUnsafe: GetHtmlPageTextType = async (
  { url, cssSelectorsArr = [] }: GetHtmlPageTextParamsType,
  {
    isWaitingForLoad = false,
    isFlattenShadowDom = false,
  }: GetHtmlPageTextOptionsType = optionsDefault,
) => {
  /* EXTRACT HTML STRING */

  const getHtmlFromHtmlPageParams: GetHtmlFromHtmlPageParamsType = { url }
  const getHtmlFromHtmlPageOptions: GetHtmlFromHtmlPageOptionsType = {
    waitForTimeout: 2000,
    isHeadless: true,
    isWaitingForLoad,
    isFlattenShadowDom,
  }

  const { html: htmlFromHtmlPage } = await getHtmlFromHtmlPage(
    getHtmlFromHtmlPageParams,
    getHtmlFromHtmlPageOptions,
  )

  let text = ''

  /* EXTRACT HTML BLOCKS BY SELECTORS */
  if (cssSelectorsArr.length) {
    consoler('\n\n\ngetHtmlPageText [96]', { htmlFromHtmlPage })

    const getHtmlBlocksExtractedParams: GetHtmlBlocksExtractedParamsType = {
      html: htmlFromHtmlPage,
      cssSelectorsArr,
    }
    const getHtmlBlocksExtractedOptions: GetHtmlBlocksExtractedOptionsType = {}

    const htmlBlocksExtracted: GetHtmlBlockExtractedResType[] = await getHtmlBlocksExtracted(
      getHtmlBlocksExtractedParams,
      getHtmlBlocksExtractedOptions,
    )

    consoler('\n\n\ngetHtmlPageText [107]', { htmlBlocksExtracted })

    /* CONVERT HTML BLOCKS TO TEXT BLOCKS */

    const htmlTextsExtracted: string[] = htmlBlocksExtracted.map(
      ({ html }: GetHtmlBlockExtractedResType) => {
        consoler('\n\n\ngetHtmlPageText [112]', { html })
        const getHtmlToTextConvertParams: GetHtmlToTextConvertParamsType = { html }
        const getHtmlToTextConvertOptions: GetHtmlToTextConvertOptionsType = {}
        const textString: string = getHtmlToTextConvert(
          getHtmlToTextConvertParams,
          getHtmlToTextConvertOptions,
        ) as string

        return textString
      },
    )

    consoler('\n\n\ngetHtmlPageText [120]', { htmlTextsExtracted })

    text = htmlTextsExtracted.reduce((accum: string, item: string) => `${accum}\n${item}`, '')
  } else {
    const getHtmlToTextConvertParams: GetHtmlToTextConvertParamsType = { html: htmlFromHtmlPage }
    const getHtmlToTextConvertOptions: GetHtmlToTextConvertOptionsType = {}
    text = getHtmlToTextConvert(getHtmlToTextConvertParams, getHtmlToTextConvertOptions) as string
  }

  return { html: htmlFromHtmlPage, text }
}

const getHtmlPageText = withTryCatchFinallyWrapper<
  GetHtmlPageTextParamsType,
  GetHtmlPageTextOptionsType,
  GetHtmlPageTextResType
>(getHtmlPageTextUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetHtmlPageTextCaseType = {
  index: number
  description?: string
  params: Parameters<typeof getHtmlPageText>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getHtmlPageText>[1]
  expected: ReturnType<typeof getHtmlPageText>
}

export type {
  GetHtmlPageTextCaseType,
  GetHtmlPageTextOptionsType,
  GetHtmlPageTextParamsType,
  GetHtmlPageTextResType,
  GetHtmlPageTextType,
}
export { getHtmlPageText }
