import { withTryCatchFinallyWrapper } from 'yourails_common'
import { consolerError } from './consolerError'

interface GetDecodedTokenJwtLegacyType {
  (token: string, secretType: string): string | undefined
}

/**
 * @description NOT USED, TO BE TESTED. Function to decode JWT
 * @import import { getDecodedTokenJwtLegacy } from './shared/utils/getDecodedTokenJwtLegacy'
 */

export const getDecodedTokenJwtLegacy: GetDecodedTokenJwtLegacyType = (
  token,
  secretType = 'SECRET_WEB_TOKEN'
) => {
  if (typeof window !== 'undefined') return

  const dotenv = require('dotenv')
  const fs = require('fs')
  const jwt = require('jsonwebtoken')
  const envConfig = dotenv.parse(fs.readFileSync(`.env.${process.env.NODE_ENV}`))
  const SECRET_TOKEN = envConfig[secretType]

  try {
    return jwt.verify(token, SECRET_TOKEN, { algorithms: ['RS256'] })
  } catch (error) {
    consolerError('getDecodedTokenJwtLegacy', error)
  }
}
