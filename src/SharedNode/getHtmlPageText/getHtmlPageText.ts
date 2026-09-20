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
  cssSelectorHeader?: string
  cssSelectorsArr: string[]
}

type GetHtmlPageTextOptionsType = {
  isWaitingForLoad?: boolean
  isFlattenShadowDom?: boolean
  funcParent?: string
}

type GetHtmlPageTextResType = {
  html: string
  text: string
  header: string
  htmlLen: number
  textLen: number
  headerLen: number
}

type GetHtmlPageTextType = (
  params: GetHtmlPageTextParamsType,
  options?: GetHtmlPageTextOptionsType,
) => Promise<GetHtmlPageTextResType>

const optionsDefault = {
  isWaitingForLoad: false,
  isFlattenShadowDom: false,
  funcParent: 'getHtmlPageText',
} satisfies Required<GetHtmlPageTextOptionsType>

const resDefault: GetHtmlPageTextResType = {
  html: '',
  text: '',
  header: '',
  htmlLen: 0,
  textLen: 0,
  headerLen: 0,
}

/**
 * @description Function to getHtmlPageText
 * @usage
   import { getHtmlPageText, GetHtmlPageTextParamsType, GetHtmlPageTextOptionsType } from './getHtmlPageText/getHtmlPageText'
   const getHtmlPageTextParams: GetHtmlPageTextParamsType = {}
   const getHtmlPageTextOptions: GetHtmlPageTextOptionsType = {}
   getHtmlPageText(getHtmlPageTextParams, getHtmlPageTextOptions)
*/
const getHtmlPageTextUnsafe: GetHtmlPageTextType = async (
  { url, cssSelectorHeader, cssSelectorsArr = [] }: GetHtmlPageTextParamsType,
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

  let header: string = ''

  if (cssSelectorHeader) {
    const getHtmlBlocksExtractedParams: GetHtmlBlocksExtractedParamsType = {
      html: htmlFromHtmlPage,
      cssSelectorsArr: [cssSelectorHeader],
    }
    const getHtmlBlocksExtractedOptions: GetHtmlBlocksExtractedOptionsType = {}

    const htmlBlocksExtracted: GetHtmlBlockExtractedResType[] = await getHtmlBlocksExtracted(
      getHtmlBlocksExtractedParams,
      getHtmlBlocksExtractedOptions,
    )

    if (htmlBlocksExtracted.length) {
      const { html } = htmlBlocksExtracted[0]
      const getHtmlToTextConvertParams: GetHtmlToTextConvertParamsType = { html }
      const getHtmlToTextConvertOptions: GetHtmlToTextConvertOptionsType = {}
      header = getHtmlToTextConvert(
        getHtmlToTextConvertParams,
        getHtmlToTextConvertOptions,
      ) as string

      if (header) header = header.charAt(0).toUpperCase() + header.slice(1).toLowerCase()
    }
  }

  let text = ''

  /* EXTRACT HTML BLOCKS BY SELECTORS */
  if (cssSelectorsArr.length) {
    const getHtmlBlocksExtractedParams: GetHtmlBlocksExtractedParamsType = {
      html: htmlFromHtmlPage,
      cssSelectorsArr,
    }
    const getHtmlBlocksExtractedOptions: GetHtmlBlocksExtractedOptionsType = {}

    const htmlBlocksExtracted: GetHtmlBlockExtractedResType[] = await getHtmlBlocksExtracted(
      getHtmlBlocksExtractedParams,
      getHtmlBlocksExtractedOptions,
    )

    /* CONVERT HTML BLOCKS TO TEXT BLOCKS */

    const htmlTextsExtracted: string[] = htmlBlocksExtracted.map(
      ({ html }: GetHtmlBlockExtractedResType) => {
        const getHtmlToTextConvertParams: GetHtmlToTextConvertParamsType = { html }
        const getHtmlToTextConvertOptions: GetHtmlToTextConvertOptionsType = {}
        const textString: string = getHtmlToTextConvert(
          getHtmlToTextConvertParams,
          getHtmlToTextConvertOptions,
        ) as string

        return textString
      },
    )

    text = htmlTextsExtracted.reduce((accum: string, item: string) => `${accum}\n${item}`, '')
  } else {
    const getHtmlToTextConvertParams: GetHtmlToTextConvertParamsType = { html: htmlFromHtmlPage }
    const getHtmlToTextConvertOptions: GetHtmlToTextConvertOptionsType = {}
    text = getHtmlToTextConvert(getHtmlToTextConvertParams, getHtmlToTextConvertOptions) as string
  }

  return {
    html: htmlFromHtmlPage,
    text,
    header,
    htmlLen: htmlFromHtmlPage.length,
    textLen: text.length,
    headerLen: header.length,
  }
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
