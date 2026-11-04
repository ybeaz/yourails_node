import {
  FileTypeEnum,
  FuncModeEnumType,
  GetNameFuncReplacedParamsType,
  getNameFuncReplaced,
  withTryCatchFinallyWrapper,
} from 'yourails_common'
import { consoler } from '../../sharedNode/consoler'
import { getDirCopied } from '../getDirCopied/getDirCopied'
import {
  GetDirFilesListedOptionsType,
  GetDirFilesListedParamsType,
  GetDirFilesListedResType,
  getDirFilesListed,
} from '../getDirFilesListed/getDirFilesListed'
import { getReadFile2 } from '../getReadFile2/getReadFile2'
import { getWrittenFile3 } from '../getWrittenFile3/getWrittenFile3'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           export const getTemplateFuncWithNameCases: GetTemplateFuncWithNameCaseType[] = [
             {
               index: 0,
               description: 'basic test getValidatedEntityLinksFilesReadable',
               params: {},
               options: {},
               expected: '',
             },
           ]
 */

type GetTemplateFuncWithNameParamsType = {
  from?: string
  to: string
  namePrev?: string
  nameNext: string
}

type GetTemplateFuncWithNameOptionsType = { funcParent?: string }

type GetTemplateFuncWithNameResType = unknown

type GetTemplateFuncWithNameType = (
  params: GetTemplateFuncWithNameParamsType,
  options?: GetTemplateFuncWithNameOptionsType,
) => GetTemplateFuncWithNameResType

const optionsDefault = {
  funcParent: 'getTemplateFuncWithName',
} satisfies Required<GetTemplateFuncWithNameOptionsType>

const resDefault: GetTemplateFuncWithNameResType = ''

/**
 * @description Function to getTemplateFuncWithName
 * @usage
   import { getTemplateFuncWithName, GetTemplateFuncWithNameParamsType, GetTemplateFuncWithNameOptionsType, GetTemplateFuncWithNameResType } from '../getTemplateFuncWithName/getTemplateFuncWithName'
   const getTemplateFuncWithNameParams: GetTemplateFuncWithNameParamsType = {}
   const getTemplateFuncWithNameOptions: GetTemplateFuncWithNameOptionsType = {}
   getTemplateFuncWithName(getTemplateFuncWithNameParams, getTemplateFuncWithNameOptions)
*/
const getTemplateFuncWithNameUnsafe: GetTemplateFuncWithNameType = async (
  {
    from = '/Users/admin/Dev/manuals/templates/getTemplateFunc',
    to,
    namePrev = 'getTemplateFunc',
    nameNext,
  }: GetTemplateFuncWithNameParamsType,
  options: GetTemplateFuncWithNameOptionsType = optionsDefault,
) => {
  const toPascal = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

  const getNameFileReplaced =
    (namePrev: string, nameNext: string) =>
    (nameFile: string): string =>
      nameFile.split(toPascal(namePrev)).join(toPascal(nameNext)).split(namePrev).join(nameNext)

  await getDirCopied(
    { pathDirAbsSrc: from, pathDirAbsDest: to },
    {
      overwrite: true,
      nameDestDir: nameNext,
      nameDestFiles: getNameFileReplaced(namePrev, nameNext),
    },
  )

  const getDirFilesListedParams: GetDirFilesListedParamsType = { pathDirAbs: to }
  const getDirFilesListedOptions: GetDirFilesListedOptionsType = {
    filter: (srcPath) => srcPath.endsWith('.ts') || srcPath.endsWith('.json'),
  }
  const pathsFilesAbs: GetDirFilesListedResType = await getDirFilesListed(
    getDirFilesListedParams,
    getDirFilesListedOptions,
  )

  consoler('getTemplateFuncWithName [100]', { pathsFilesAbs })

  for await (const pathFileAbs of pathsFilesAbs) {
    /* Returns the text content of the files */
    const content: string = (await getReadFile2(
      { pathFileAbs },
      { fileType: FileTypeEnum.txt },
    )) as string

    const getNameFuncReplacedParams: GetNameFuncReplacedParamsType = {
      str: content,
      namePrev,
      nameNext,
    }
    const contentNext = getNameFuncReplaced(getNameFuncReplacedParams)

    await getWrittenFile3(
      { pathFileAbs, data: contentNext },
      { isOverwrite: true, fileType: FileTypeEnum.txt },
    )
  }

  return `${to}/${nameNext}`
}

type GetTemplateFuncWithNameCaseType = {
  index: number
  description?: string
  params: Parameters<typeof getTemplateFuncWithName>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getTemplateFuncWithName>[1]
  expected: ReturnType<typeof getTemplateFuncWithName>
}

const getTemplateFuncWithName = withTryCatchFinallyWrapper<
  GetTemplateFuncWithNameParamsType,
  GetTemplateFuncWithNameOptionsType,
  GetTemplateFuncWithNameResType
>(getTemplateFuncWithNameUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export type {
  GetTemplateFuncWithNameCaseType,
  GetTemplateFuncWithNameOptionsType,
  GetTemplateFuncWithNameParamsType,
  GetTemplateFuncWithNameResType,
  GetTemplateFuncWithNameType,
}
export { getTemplateFuncWithName }
