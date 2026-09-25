import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           const getHtmlSnippetFromItemsCases = [
             {
               index: 0,
               description: 'basic test getValidatedEntityLinksFilesReadable',
               params: {},
               options: {},
               expected: '',
             },
           ]
 */

type GetHtmlSnippetFromItemsParamsType = {
  items: string | string[]
}

type GetHtmlSnippetFromItemsOptionsType = {
  contentType?: 'ul' | 'ol' | 'none'
  funcParent?: string
}

type GetHtmlSnippetFromItemsResType = string

type GetHtmlSnippetFromItemsType = (
  params: GetHtmlSnippetFromItemsParamsType,
  options?: GetHtmlSnippetFromItemsOptionsType,
) => GetHtmlSnippetFromItemsResType

const optionsDefault = {
  contentType: 'ul',
  funcParent: 'getHtmlSnippetFromItems',
} satisfies Required<GetHtmlSnippetFromItemsOptionsType>

const resDefault: GetHtmlSnippetFromItemsResType = ''

type ContentType = Required<GetHtmlSnippetFromItemsOptionsType>['contentType']

const styleBase =
  '.items{margin:0;color:#24292f;line-height:2}' +
  '.items-item{margin:0 0 0.35em}' +
  '.items-item:last-child{margin-bottom:0}'

const styleByContentType: Record<ContentType, string> = {
  ul:
    '.items-ul{padding-left:1.25em;list-style:disc}' +
    '.items-ul .items-item::marker{color:#0969da}',
  ol:
    '.items-ol{padding-left:1.5em;list-style:decimal}' +
    '.items-ol .items-item::marker{color:#0969da}',
  none: '.items-none{padding:0;list-style:none}',
}

const tagByContentType: Record<ContentType, 'ul' | 'ol'> = {
  ul: 'ul',
  ol: 'ol',
  none: 'ul',
}

const isContentType = (value: unknown): value is ContentType =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(styleByContentType, value)

// Coerces missing/undefined/invalid values to the defaults
const resolveOptions = (
  options: GetHtmlSnippetFromItemsOptionsType = {},
): Required<GetHtmlSnippetFromItemsOptionsType> => ({
  contentType: isContentType(options.contentType)
    ? options.contentType
    : optionsDefault.contentType,
  funcParent: options.funcParent ?? optionsDefault.funcParent,
})

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/**
 * @description Function to return html from string items
 * @usage
   import { getHtmlSnippetFromItems, GetHtmlSnippetFromItemsParamsType, GetHtmlSnippetFromItemsOptionsType, GetHtmlSnippetFromItemsResType } from '../getHtmlSnippetFromItems/getHtmlSnippetFromItems'
   const getHtmlSnippetFromItemsParams: GetHtmlSnippetFromItemsParamsType = { items: ['First point', 'Second point'] }
   const getHtmlSnippetFromItemsOptions: GetHtmlSnippetFromItemsOptionsType = {}
   getHtmlSnippetFromItems(getHtmlSnippetFromItemsParams, getHtmlSnippetFromItemsOptions)
*/
const getHtmlSnippetFromItemsUnsafe: GetHtmlSnippetFromItemsType = (
  { items: itemsIn }: GetHtmlSnippetFromItemsParamsType,
  options: GetHtmlSnippetFromItemsOptionsType = optionsDefault,
) => {
  let items: string[] = itemsIn as string[]
  if (typeof itemsIn === 'string') items = [itemsIn]

  const { contentType } = resolveOptions(options)

  const listItems = items
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `<li class="items-item">${escapeHtml(item)}</li>`)

  if (!listItems.length) return resDefault

  const tag = tagByContentType[contentType]
  const style = `<style>${styleBase}${styleByContentType[contentType]}</style>`

  return `${style}<${tag} class="items items-${contentType}">${listItems.join('')}</${tag}>`
}

const getHtmlSnippetFromItems = withTryCatchFinallyWrapper<
  GetHtmlSnippetFromItemsParamsType,
  GetHtmlSnippetFromItemsOptionsType,
  GetHtmlSnippetFromItemsResType
>(getHtmlSnippetFromItemsUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetHtmlSnippetFromItemsCaseType = {
  index: number
  description?: string
  params: Parameters<typeof getHtmlSnippetFromItems>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getHtmlSnippetFromItems>[1]
  expected: ReturnType<typeof getHtmlSnippetFromItems>
}

export type {
  GetHtmlSnippetFromItemsCaseType,
  GetHtmlSnippetFromItemsOptionsType,
  GetHtmlSnippetFromItemsParamsType,
  GetHtmlSnippetFromItemsResType,
  GetHtmlSnippetFromItemsType,
}
export { getHtmlSnippetFromItems }
