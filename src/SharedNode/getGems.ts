import { withTryCatchFinallyWrapper } from 'yourails_common'

import { nanoid as nanoidFunc, customRandom, random } from 'nanoid'
import { v4 as uuidv4Func } from 'uuid'

import { getDateString } from 'yourails_common'
import { getPassword } from 'yourails_common'
import { getChangedCharOnPostionToALCR } from 'yourails_common'

import { consoler } from './consoler'
import { consolerError } from './consolerError'

type OptionsType = {
  idLength: number
  passwordLength: number
}

type GetGemsResType = {
  uuidv4: string
  nanoid: string
  alphaNum: string
  password: string
  dateTime: string
  timestamp: number
}

interface GetGemsType {
  (options?: OptionsType): GetGemsResType
}

const optionsDefault: OptionsType = { idLength: 12, passwordLength: 19 }

const resultDefault: GetGemsResType = {
  uuidv4: '',
  nanoid: '',
  alphaNum: '',
  password: '',
  dateTime: '',
  timestamp: 0,
}

/**
 * @description Function to getGems
 * @run ts-node tools/getGems.ts
 * @import import { getGems } from './getGems'
 */
export const getGems: GetGemsType = (optionsIn: OptionsType = optionsDefault) => {
  if (typeof window !== 'undefined') return resultDefault

  const options: OptionsType = { ...optionsDefault, ...optionsIn }
  const { idLength, passwordLength } = options

  const urlAlphabet = '1234567890AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'

  const uuidv4 = uuidv4Func()
  const nanoid = nanoidFunc()

  /* Return alphaNum */
  const nanoAlphaNum = customRandom(urlAlphabet, idLength, random)()
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
    const nanoPassword = customRandom(urlAlphabet, passwordLength, random)()

    password = getChangedCharOnPostionToALCR(
      getPassword(nanoPassword, { charsNotAlphanumeric: ['!', '_', '#'] }),
      { position: 0, charCase: 'lowerCase' }
    )
    password = getChangedCharOnPostionToALCR(password, {
      position: password.length - 1,
      charCase: 'upperCase',
    })

    matchConditions = !!(
      password.match(regexLowCase) &&
      password.match(regexLowCase)!.length > 2 &&
      password.match(regexUpCase) &&
      password.match(regexUpCase)!.length > 2 &&
      password.match(regexNumbers) &&
      password.match(regexNumbers)!.length > 2 &&
      password.match(regexSympols) &&
      password.match(regexSympols)!.length > 2
    )

    // consoler('getGems [100]', {
    //   countPasswordLookup,
    //   password,
    //   matchConditions,
    //   regexLowCase: password.match(regexLowCase) && password.match(regexLowCase)!.length,
    //   regexUpCase: password.match(regexUpCase) && password.match(regexUpCase)!.length,
    //   regexNumbers: password.match(regexNumbers) && password.match(regexNumbers)!.length,
    //   regexSympols: password.match(regexSympols) && password.match(regexSympols)!.length,
    // })

    countPasswordLookup += 1

    if (countPasswordLookup > 100) break
  }
  const dateTime = getDateString({})
  const timestamp = +new Date()

  const getGemsRes: GetGemsResType = {
    uuidv4,
    nanoid,
    alphaNum,
    password,
    dateTime,
    timestamp,
  }

  return getGemsRes
}

/**
 * @run ts-node src/SharedNode/getGems.ts
 */
if (require.main === module) {
  const output = getGems()
  consoler('getGems [100]', output)
}
