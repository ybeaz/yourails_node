import { withTryCatchFinallyWrapper } from 'yourails_common'
import { consolerError } from './consolerError'

interface GetDecodedTokenJwtType {
  (token: string, secretType: string): string | undefined
}

/**
 * @description NOT USED, TO BE TESTED. Function to decode JWT
 * @import import { getDecodedTokenJwt } from './shared/utils/getDecodedTokenJwt'
 */

export const getDecodedTokenJwt: GetDecodedTokenJwtType = (
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
    consolerError('getDecodedTokenJwt', error)
  }
}
