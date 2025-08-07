import { consoler } from 'yourails_common'
import {
  withTryCatchFinallyWrapper,
  FuncModeEnumType,
  WithTryCatchFinallyWrapperOptionsType,
} from 'yourails_common'

type GetEncodedTokenJwtParamsType = {
  payload: any
  secretPrivateKey: string
  algorithm: string
  expiresIn?: number
}

type GetEncodedTokenJwtOptionsType = { funcParent?: string }

type GetEncodedTokenJwtResType = string | undefined

interface GetEncodedTokenJwtType {
  (
    params: GetEncodedTokenJwtParamsType,
    options?: GetEncodedTokenJwtOptionsType
  ): GetEncodedTokenJwtResType
}

const optionsDefault: Required<GetEncodedTokenJwtOptionsType> = {
  funcParent: 'getEncodedTokenJwt',
}

const resDefault: GetEncodedTokenJwtResType = ''

/**
 * @description Function to getEncodedTokenJwt
 * @import import { getEncodedTokenJwt } from './getEncodedTokenJwt'
 */

const getEncodedTokenJwtUnsafe: GetEncodedTokenJwtType = (
  {
    payload,
    secretPrivateKey = 'SECRET_WEB_TOKEN',
    algorithm = 'HS256',
    expiresIn,
  }: GetEncodedTokenJwtParamsType,
  options?: GetEncodedTokenJwtOptionsType
) => {
  if (typeof window !== 'undefined') return

  const dotenv = require('dotenv')
  const fs = require('fs')
  const jwt = require('jsonwebtoken')

  let secretPrivateToken = secretPrivateKey
  if (process.env?.NODE_ENV) {
    const envConfig = dotenv.parse(fs.readFileSync(`.env.${process.env?.NODE_ENV}`))
    secretPrivateToken = envConfig[secretPrivateKey]
  }

  const token = jwt.sign(payload, secretPrivateToken, {
    algorithm,
    ...(expiresIn ? { expiresIn } : {}),
  })

  return token
}

const getEncodedTokenJwt = withTryCatchFinallyWrapper(getEncodedTokenJwtUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export { getEncodedTokenJwt, getEncodedTokenJwtUnsafe }
export type {
  GetEncodedTokenJwtParamsType,
  GetEncodedTokenJwtOptionsType,
  GetEncodedTokenJwtResType,
  GetEncodedTokenJwtType,
}

/**
 * @description Here the file is being run directly
 * @run ts-node src/SharedNode/getEncodedTokenJwt.ts
 */
if (require.main === module) {
  ;(async () => {
    type ExampleType = {
      params: GetEncodedTokenJwtParamsType
      options: GetEncodedTokenJwtOptionsType
      expected: GetEncodedTokenJwtResType
    }
    const examples: ExampleType[] = [
      {
        params: {
          payload: { login: 'arbir.343@gmail.com', password: 'xxxYyyZzz' },
          secretPrivateKey: 'my-secret-token-123456',
          algorithm: 'HS256',
        },
        options: {},
        expected:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFyYmlyLjM0M0BnbWFpbC5jb20iLCJwYXNzd29yZCI6Inh4eFl5eVp6eiIsImlhdCI6MTc1MTA3OTYyOH0.hBoNu03GUbvJqacNdU8QAjI5Yovm0OOQIp_F21gZSc0',
      },
    ]

    const promises = examples.map((example: ExampleType, index: number) => {
      const { params, options, expected } = example

      const output = getEncodedTokenJwt(params, options)
      consoler(`getEncodedTokenJwt [61-${index}]`, {
        params,
        output,
        tested: JSON.stringify(output) === JSON.stringify(expected),
      })
    })
    await Promise.all(promises)
  })()
}
