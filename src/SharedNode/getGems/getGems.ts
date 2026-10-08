import { customRandom, nanoid as nanoidFunc, random } from 'nanoid'
import { v4 as uuidv4Func } from 'uuid'
import {
  FuncModeEnumType,
  getChangedCharOnPostionToALCR,
  getDateString,
  getPassword,
  getPasswordHuman,
  withTryCatchFinallyWrapper,
} from 'yourails_common'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           export const getGemsCases: GetGemsCaseType[] = [
             {
               index: 0,
               description: 'basic test getValidatedEntityLinksFilesReadable',
               params: {},
               options: {},
               expected: '',
             },
           ]
 */

type GetGemsParamsType = Record<string, unknown>

type GetGemsOptionsType = { idLength?: number; passwordLength?: number; funcParent?: string }

type GetGemsResType = {
  uuidv4: string
  nanoid: string
  alphaNum: string
  password: string
  passwordHuman: string
  dateTime: string
  timestamp: number
}

type GetGemsType = (
  params: GetGemsParamsType,
  options?: GetGemsOptionsType,
) => Promise<GetGemsResType>

const optionsDefault = {
  idLength: 21,
  passwordLength: 21,
  funcParent: 'getGems',
} satisfies Required<GetGemsOptionsType>

const resDefault: GetGemsResType = {
  uuidv4: '',
  nanoid: '',
  alphaNum: '',
  password: '',
  passwordHuman: '',
  dateTime: '',
  timestamp: 0,
}

/**
 * @description Function to getGems
 * @usage
   import { getGems, GetGemsParamsType, GetGemsOptionsType, GetGemsResType } from '../getGems/getGems'
   const getGemsParams: GetGemsParamsType = {}
   const getGemsOptions: GetGemsOptionsType = {}
   getGems(getGemsParams, getGemsOptions)
*/
const getGemsUnsafe: GetGemsType = async (
  params: GetGemsParamsType,
  optionsIn: GetGemsOptionsType = optionsDefault,
) => {
  if (typeof window !== 'undefined') return resDefault

  const options: GetGemsOptionsType = { ...optionsDefault, ...optionsIn }
  const { idLength, passwordLength } = options

  const urlAlphabet = '1234567890AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'

  const uuidv4 = uuidv4Func()
  const nanoid = nanoidFunc()

  /* Return alphaNum */
  const nanoAlphaNum = customRandom(urlAlphabet, idLength || optionsDefault.idLength, random)()
  let alphaNum = getChangedCharOnPostionToALCR(nanoAlphaNum, {
    position: 0,
    charCase: 'lowerCase',
  })
  alphaNum = getChangedCharOnPostionToALCR(alphaNum, {
    position: alphaNum.length - 1,
    charCase: 'upperCase',
  })

  /* Return password */
  const regexLowCase = /[a-z]/g
  const regexUpCase = /[A-Z]/g
  const regexNumbers = /[0-9]/g
  const regexSympols = /[^a-zA-Z\d]/g
  let matchConditions = false

  let password = ''
  let countPasswordLookup = 0

  while (!matchConditions) {
    const nanoPassword = customRandom(
      urlAlphabet,
      passwordLength || optionsDefault.passwordLength,
      random,
    )()

    password = getChangedCharOnPostionToALCR(
      getPassword(nanoPassword, { charsNotAlphanumeric: ['!', '_', '#'] }),
      { position: 0, charCase: 'lowerCase' },
    )
    password = getChangedCharOnPostionToALCR(password, {
      position: password.length - 1,
      charCase: 'upperCase',
    })

    matchConditions = !!(
      (password.match(regexLowCase) ?? []).length > 2 &&
      (password.match(regexUpCase) ?? []).length > 2 &&
      (password.match(regexNumbers) ?? []).length > 2 &&
      (password.match(regexSympols) ?? []).length > 2
    )

    countPasswordLookup += 1

    if (countPasswordLookup > 100) break
  }
  const dateTime = getDateString({})
  const timestamp = +new Date()

  const passwordHuman = await getPasswordHuman({})

  const getGemsRes: GetGemsResType = {
    uuidv4,
    nanoid,
    alphaNum,
    password,
    passwordHuman,
    dateTime,
    timestamp,
  }

  return getGemsRes
}

type GetGemsCaseType = {
  index: number
  description?: string
  params: Parameters<typeof getGems>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getGems>[1]
  expected: ReturnType<typeof getGems>
}

const getGems = withTryCatchFinallyWrapper<GetGemsParamsType, GetGemsOptionsType, GetGemsResType>(
  getGemsUnsafe,
  {
    optionsDefault,
    resDefault,
    funcMode: FuncModeEnumType.common,
    isFinally: false,
  },
)

export type { GetGemsCaseType, GetGemsOptionsType, GetGemsParamsType, GetGemsResType, GetGemsType }
export { getGems }
