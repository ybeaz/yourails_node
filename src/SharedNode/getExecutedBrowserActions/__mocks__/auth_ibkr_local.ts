process.env.NODE_ENV = process.env.NODE_ENV || 'development'

import {
  BrowserActionType,
  GetRandomNumBetweenResType,
  getRandomNumBetween,
  HandlersPlaywriteKeysEnum,
} from 'yourails_common'
import { consoler } from '../../consoler'
import { getDecodedTokenJwt } from '../../getDecodedTokenJwt'

const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.7151.122 Safari/537.36'

const { login, password, url } = getDecodedTokenJwt({
  tokenEnvKey: 'IBKR_LOCAL',
  secretPrivateEnvKey: 'SECRET_WEB_TOKEN_2',
})
// consoler('auth_ibkr_local [21]', { login, password, url })

export const auth_ibkr_local: BrowserActionType[] = [
  {
    toolName: HandlersPlaywriteKeysEnum.navigate,
    toolArgs: {
      url,
    },
  },
  // {
  //   toolName: HandlersPlaywriteKeysEnum.click_text,
  //   toolArgs: {
  //     text: ' Advanced ',
  //   },
  // },
  // {
  //   toolName: HandlersPlaywriteKeysEnum.click_text,
  //   toolArgs: {
  //     text: 'Proceed to localhost (unsafe)',
  //   },
  // },
  {
    timeoutBefore: 1000 + getRandomNumBetween(100, 2000, true),
    toolName: HandlersPlaywriteKeysEnum.evaluate,
    toolArgs: {
      script: `
      const webview = document.createElement('webview');
      webview.src = ${JSON.stringify(url)};
      webview.setAttribute('useragent', ${JSON.stringify(userAgent)});
      document.body.appendChild(webview);
    `,
    },
  },
  {
    toolName: HandlersPlaywriteKeysEnum.fill,
    toolArgs: {
      selector:
        'input[type="text"][name="username"][placeholder="Username"][id="xyz-field-username"]',
      value: login,
      // getDecodedTokenJwt({
      //   // tokenEnvKey: 'IBKR_LOCAL',
      //   token:
      //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlIjoiaWJrciBsb2NhbCwgaW50ZXJhY3RpdmUgYnJva2VycywgaW50ZXJhY3RpdmVicm9rZXJzLmNvbSBpYmtyIiwiRU5WX0tFWSI6IklCS1JfTE9DQUwiLCJ1cmwiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxL3Nzby9Mb2dpbj9mb3J3YXJkVG89MjImUkw9MSZpcDJsb2M9VVMiLCJsb2dpbiI6InR1aGNxdzAyMSIsInBhc3N3b3JkIjoidXNhSW50ZXJhY3RpdmVCcm9rZXJzMjAyMl8iLCJpYXQiOjE3NTQ5NTcwNDV9.bHpai0mAqGSnmpgVsO_U41Fu7qu9xXyTt4RfGfHzlAg',
      //   secretPrivateEnvKey: 'SECRET_WEB_TOKEN_2',
      // }).login,
    },
    timeoutAfter: 2400 + getRandomNumBetween(100, 2000, true),
    // timeoutTeminate: 2000,
  },
  {
    toolName: HandlersPlaywriteKeysEnum.fill,
    toolArgs: {
      selector:
        'input[type="password"][name="password"][placeholder="Password"][id="xyz-field-password"]',
      value: password,
    },
    timeoutAfter: 1200 + getRandomNumBetween(100, 2000, true),
    // timeoutTeminate: 2000,
  },
  {
    toolName: HandlersPlaywriteKeysEnum.click,
    toolArgs: {
      selector: 'button[type="submit"]',
    },
    timeoutAfter: 4500 + getRandomNumBetween(100, 2000, true),
    // timeoutTeminate: 2000,
  },
  {
    timeoutBefore: 4500 + getRandomNumBetween(100, 2000, true),
    toolName: HandlersPlaywriteKeysEnum.navigate,
    toolArgs: {
      url: 'https://localhost:5001/sso/Dispatcher',
    },
  },
]
