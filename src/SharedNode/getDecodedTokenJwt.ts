import { consoler } from 'yourails_common'
import {
  withTryCatchFinallyWrapper,
  FuncModeEnumType,
  WithTryCatchFinallyWrapperOptionsType,
} from 'yourails_common'

type getDecodedTokenJwtParamsType = {
  token?: string
  tokenEnvKey?: string
  secretPrivateToken?: string
  secretPrivateEnvKey?: string
  algorithms?: string[]
}

type getDecodedTokenJwtOptionsType = { funcParent?: string }

type getDecodedTokenJwtResType = any

interface getDecodedTokenJwtType {
  (
    params: getDecodedTokenJwtParamsType,
    options?: getDecodedTokenJwtOptionsType
  ): getDecodedTokenJwtResType
}

const optionsDefault: Required<getDecodedTokenJwtOptionsType> = {
  funcParent: 'getDecodedTokenJwt',
}

const resDefault: getDecodedTokenJwtResType = ''

/**
 * @description Function to getDecodedTokenJwt
 * @import import { getDecodedTokenJwt } from './getDecodedTokenJwt'
 */

const getDecodedTokenJwtUnsafe: getDecodedTokenJwtType = (
  {
    token,
    tokenEnvKey,
    secretPrivateToken,
    secretPrivateEnvKey = 'SECRET_WEB_TOKEN',
    algorithms = ['HS256'],
  }: getDecodedTokenJwtParamsType,
  options?: getDecodedTokenJwtOptionsType
) => {
  if (typeof window !== 'undefined') return

  const dotenv = require('dotenv')
  const fs = require('fs')
  const jwt = require('jsonwebtoken')

  let tokenToUse = token
  let secretPrivateTokenToUse = secretPrivateToken
  let envConfig: any = {}

  if (!secretPrivateTokenToUse || tokenEnvKey)
    envConfig = dotenv.parse(fs.readFileSync(`.env.${process.env?.NODE_ENV}`))

  if (tokenEnvKey) {
    tokenToUse = envConfig[tokenEnvKey]
  }

  if (secretPrivateEnvKey) {
    secretPrivateTokenToUse = envConfig[secretPrivateEnvKey]
  }

  return jwt.verify(tokenToUse, secretPrivateTokenToUse, { algorithms })
}

const getDecodedTokenJwt = withTryCatchFinallyWrapper(getDecodedTokenJwtUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export { getDecodedTokenJwt, getDecodedTokenJwtUnsafe }
export type {
  getDecodedTokenJwtParamsType,
  getDecodedTokenJwtOptionsType,
  getDecodedTokenJwtResType,
  getDecodedTokenJwtType,
}

/**
 * @description Here the file is being run directly
 * @run NODE_ENV=development ts-node src/SharedNode/getDecodedTokenJwt.ts
 */
if (require.main === module) {
  ;(async () => {
    type ExampleType = {
      params: getDecodedTokenJwtParamsType
      expected: getDecodedTokenJwtResType
    }
    const examples: ExampleType[] = [
      {
        params: {
          tokenEnvKey: 'WEB_TOKEN',
        },
        expected: {
          login: 'arbir.343@gmail.com',
          password: 'xxxYyyZzz',
          iat: 1751079628,
        },
      },
      // {
      //   params: {
      //     tokenEnvKey: 'WEB_TOKEN',
      //     secretPrivateEnvKey: 'SECRET_WEB_TOKEN',
      //     algorithms: ['HS256'],
      //   },
      //   expected: {
      //     login: 'arbir.343@gmail.com',
      //     password: 'xxxYyyZzz',
      //     iat: 1751079628,
      //   },
      // },
      // {
      //   params: {
      //     token:
      //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFyYmlyLjM0M0BnbWFpbC5jb20iLCJwYXNzd29yZCI6Inh4eFl5eVp6eiIsImlhdCI6MTc1MTA3OTYyOH0.hBoNu03GUbvJqacNdU8QAjI5Yovm0OOQIp_F21gZSc0',
      //     secretPrivateEnvKey: 'SECRET_WEB_TOKEN',
      //     algorithms: ['HS256'],
      //   },
      //   expected: {
      //     login: 'arbir.343@gmail.com',
      //     password: 'xxxYyyZzz',
      //     iat: 1751079628,
      //   },
      // },
    ]

    const promises = examples.map((example: ExampleType, index: number) => {
      const { params, expected } = example

      const output = getDecodedTokenJwt(params)
      consoler(`getDecodedTokenJwt [61-${index}]`, {
        params,
        output,
        tested: JSON.stringify(output) === JSON.stringify(expected),
      })
    })
    await Promise.all(promises)
  })()
}
