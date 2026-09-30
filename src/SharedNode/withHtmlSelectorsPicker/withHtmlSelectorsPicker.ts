import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'
import {
  GetHtmlBlockExtractedResType,
  GetHtmlBlocksExtractedOptionsType,
  GetHtmlBlocksExtractedParamsType,
  getHtmlBlocksExtracted,
} from '../getHtmlBlocksExtracted/getHtmlBlocksExtracted'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           export const withHtmlSelectorsPickerCases: WithHtmlSelectorsPickerCaseType[] = [
             {
               index: 0,
               description: 'basic test getValidatedEntityLinksFilesReadable',
               params: {},
               options: {},
               expected: '',
             },
           ]
 */

type WithHtmlSelectorsPickerParamsType = Record<string, unknown>

type WithHtmlSelectorsPickerOptionsType = { funcParent?: string }

type WithHtmlSelectorsPickerResType = unknown

type WithHtmlSelectorsPickerType = (
  params: WithHtmlSelectorsPickerParamsType,
  options?: WithHtmlSelectorsPickerOptionsType,
) => WithHtmlSelectorsPickerResType

const optionsDefault = {
  funcParent: 'withHtmlSelectorsPicker',
} satisfies Required<WithHtmlSelectorsPickerOptionsType>

const resDefault: WithHtmlSelectorsPickerResType = ''

/**
 * @description Function to withHtmlSelectorsPicker
 * @examples
    https://example.com#
 * @usage
    import { withHtmlSelectorsPicker, WithHtmlSelectorsPickerParamsType, WithHtmlSelectorsPickerOptionsType, WithHtmlSelectorsPickerResType } from '../withHtmlSelectorsPicker/withHtmlSelectorsPicker'
    const withHtmlSelectorsPickerParams: WithHtmlSelectorsPickerParamsType = {}
    const withHtmlSelectorsPickerOptions: WithHtmlSelectorsPickerOptionsType = {}
    withHtmlSelectorsPicker(withHtmlSelectorsPickerParams, withHtmlSelectorsPickerOptions)
*/
const withHtmlSelectorsPickerUnsafe: WithHtmlSelectorsPickerType = (
  params: WithHtmlSelectorsPickerParamsType,
  options: WithHtmlSelectorsPickerOptionsType = optionsDefault,
) => {
  return ''
}

type WithHtmlSelectorsPickerCaseType = {
  index: number
  description?: string
  params: Parameters<typeof withHtmlSelectorsPicker>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof withHtmlSelectorsPicker>[1]
  expected: ReturnType<typeof withHtmlSelectorsPicker>
}

const withHtmlSelectorsPicker = withTryCatchFinallyWrapper<
  WithHtmlSelectorsPickerParamsType,
  WithHtmlSelectorsPickerOptionsType,
  WithHtmlSelectorsPickerResType
>(withHtmlSelectorsPickerUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export type {
  WithHtmlSelectorsPickerCaseType,
  WithHtmlSelectorsPickerOptionsType,
  WithHtmlSelectorsPickerParamsType,
  WithHtmlSelectorsPickerResType,
  WithHtmlSelectorsPickerType,
}
export { withHtmlSelectorsPicker }
