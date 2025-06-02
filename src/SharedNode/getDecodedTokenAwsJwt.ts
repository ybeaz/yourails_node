import { consoler } from './consoler'
import { consolerError } from './consolerError'

import jwt from 'jsonwebtoken'
import { CognitoJwtVerifier } from 'aws-jwt-verify'

// const envConfig = dotenv.parse(fs.readFileSync(`.env.${process.env.NODE_ENV}`))

type GetDecodedTokenAwsJwtParamsType = {
  token: string
  clientId: string
  userPoolId: string
}

interface GetDecodedTokenAwsJwtType {
  (params: GetDecodedTokenAwsJwtParamsType): jwt.JwtPayload
}

/**
 * @description Function to decode AWS Cognito JWT
 * @link https://www.npmjs.com/package/aws-jwt-verify
 * @link https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-id-token.html
 * @link https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-idp-settings.html
 * @import import { getDecodedTokenAwsJwt } from './shared/utils/getDecodedTokenAwsJwt'
 */

export const getDecodedTokenAwsJwt: GetDecodedTokenAwsJwtType = async ({
  token,
  clientId,
  userPoolId,
}) => {
  const verifier = CognitoJwtVerifier.create({
    userPoolId,
    tokenUse: 'id', // 'id', 'access'
    clientId,
  })

  try {
    if (typeof window !== 'undefined') return

    const payload = await verifier.verify(token)
    return payload
  } catch (error: any) {
    consolerError('getDecodedTokenAwsJwt', error)
    return { message: error.message }
  }
}

/**
 * @description Here the file is being run directly
 * @run ts-node src/Shared/getDecodedTokenAwsJwt.ts
 */
if (require.main === module) {
  ;(async () => {
    const params = {
      userPoolId: 'us-east-1_MxxirxMYp',
      clientId: '635evv2b44uuluiu6au25djr64',
      token:
        'eyJraWQiOiIyejNRd0l0Tkd2STl2Y2RzRlNJeEdpK0hNRjJTNjZiS1BPbFpmY3Z6Q1FJPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiQ1ltaUQwQlFIWGRDUFB5U1N5RU1mQSIsInN1YiI6Ijk0Zjg4NDk4LTIwOTEtNzBiYy1kY2M0LWEzMmYxZDgyNWIwYSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9NeHhpcnhNWXAiLCJjb2duaXRvOnVzZXJuYW1lIjoiOTRmODg0OTgtMjA5MS03MGJjLWRjYzQtYTMyZjFkODI1YjBhIiwib3JpZ2luX2p0aSI6IjgyYmE5ZTdiLTZjZDItNDlhZC05NDIzLWQ5M2NjOTFlODE3MyIsImF1ZCI6IjYzNWV2djJiNDR1dWx1aXU2YXUyNWRqcjY0IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MDgyMzQzOTYsImV4cCI6MTcwODIzNzk5NiwiaWF0IjoxNzA4MjM0Mzk2LCJqdGkiOiI0ZmYyZmNlMS0xNWU0LTQ2YmItYjE4OC02YTM3NTczNzE0ZmEiLCJlbWFpbCI6InIxQHVzZXJ0by5jb20ifQ.rxo4BwAV16rIoeXPA4mE23PHJIbcoF3an4hfnA7LDUK7hvfKBtD2Mtn6KJ-kJsUpetzO0blETN7K_-uOn14K3rhDLuiTVdxQVozDHTalWYBjtXVNT5Fm1A8hfykVzwTWTkV6ziJyOGdcPoDPTptlSjBIvL4qSm_GpjvUVO1nrs3CUmqeB7bHjLnn5joxXcopgPH1TCKq6rzr5Ic14XcwxrmUoTbj8Kiv-QDjGpI1YiSrec591gILGDEDR8wq91NNxb8OE36s8JIJpIqas6D11-Ccg92YowoRSwahrp8sXQHJk5VRnpINadAKK6KVOfc22vP2wPgoCMrbrxKhSoAMfA',
    }
    const output = await getDecodedTokenAwsJwt(params)
    consoler('getTemplateFuncAsync [61]', output)
  })()
}
