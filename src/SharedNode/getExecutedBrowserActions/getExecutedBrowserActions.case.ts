import { HandlersPlaywriteKeysEnum } from 'yourails_common'
import { auth_ibkr_local } from './__mocks__/auth_ibkr_local'
import type {
  GetExecutedBrowserActionResType,
  GetExecutedBrowserActionsCaseType,
  GetExecutedBrowserActionsParamsType,
} from './getExecutedBrowserActions'

//

export const getExecutedBrowserActionsCases: GetExecutedBrowserActionsCaseType[] = [
  {
    index: 2,
    description: 'getting code 4/ from tiktok.com/v2/auth',
    params: {
      actions: [
        {
          toolName: HandlersPlaywriteKeysEnum.navigate,
          toolArgs: {
            url: 'https://www.tiktok.com/v2/auth/authorize/?client_key=awq7993pqoq9jjkq&scope=user.info.basic%2Cvideo.upload&response_type=code&redirect_uri=https%3A%2F%2Fyourails.com%2Fauth-tiktok&state=3b4bd8942dbc8e230ac724191116bbf3&code_challenge=f2db46927c5344efd50a5512799c4901790bb402cf84e4aae6323dafa3b46ec6&code_challenge_method=S256',
          },
        },
      ],
      isPauseResume: false,
      isShowingInfo: false,
      isClosingAtFinish: true,
      isProduction: true,
      finalUrlPattern: '**/yourails.com/auth-tiktok**',
      timeoutFinalUrlMs: 60000,
      cdpEndpoint: 'http://localhost:9222',
    },
    options: {},
    expected: [],
  },
  {
    index: 1,
    description: 'getting code 4/ from accounts.google.com/o/oauth2/v2/auth',
    params: {
      actions: [
        {
          toolName: HandlersPlaywriteKeysEnum.navigate,
          toolArgs: {
            url: 'https://accounts.google.com/o/oauth2/v2/auth?client_id=756709380715-92ni8gbaiddbee18c1l63pjeu0pc1u27.apps.googleusercontent.com&redirect_uri=http://localhost:3000/oauth2callback&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutubepartner&access_type=offline&prompt=consent',
          },
        },
        {
          toolName: HandlersPlaywriteKeysEnum.wait_for_url,
          toolArgs: { url: '**/signin/oauth/delegation**' },
        },
        {
          toolName: HandlersPlaywriteKeysEnum.click_text,
          toolArgs: { text: 'YouRails' },
        },
        {
          toolName: HandlersPlaywriteKeysEnum.wait_for_url,
          toolArgs: { url: '**/signin/oauth/warning**' },
        },
        // {
        //   toolName: HandlersPlaywriteKeysEnum.selector_check /* optional, debug only */,
        //   toolArgs: { selector: 'button:has(span:text-is("Continue"))' },
        // },
        {
          toolName: HandlersPlaywriteKeysEnum.click_selector,
          toolArgs: { selector: 'button:has(span:text-is("Continue"))' },
          timeoutBefore: 500 /* lets Google's jsaction handlers attach */,
        },
        {
          toolName: HandlersPlaywriteKeysEnum.wait_for_url,
          // toolArgs: { url: '**/oauth2callback**', waitUntil: 'commit' },
          toolArgs: { url: '**signin/oauth/v3/consent**', waitUntil: 'commit' },
        },
        {
          toolName: HandlersPlaywriteKeysEnum.click_selector,
          toolArgs: { selector: 'button:has(span:text-is("Continue"))' },
          timeoutBefore: 500 /* lets Google's jsaction handlers attach */,
        },
      ],
      isPauseResume: false,
      isShowingInfo: false,
      isClosingAtFinish: true,
      isProduction: true,
      finalUrlPattern: '**/oauth2callback**',
      timeoutFinalUrlMs: 60000,
      cdpEndpoint: 'http://localhost:9222',
    },
    options: {},
    expected: [],
  },
  {
    index: 0,
    description: 'authentication with IBKR',
    params: {
      actions: auth_ibkr_local,
      isPauseResume: false,
      isShowingInfo: true,
      // cdpEndpoint: 'http://localhost:9222',
    },
    options: {},
    expected: [],
  },
]
