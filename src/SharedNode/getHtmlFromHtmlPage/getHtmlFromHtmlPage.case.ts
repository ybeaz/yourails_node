import { join } from 'node:path'
import { getDateString } from 'yourails_common'
import type {
  GetHtmlFromHtmlPageCaseType,
  GetHtmlFromHtmlPageParamsType,
} from './getHtmlFromHtmlPage'

const dateString = getDateString({
  timestamp: new Date(),
  dash: true,
  hours: true,
  minutes: true,
  seconds: true,
  isUtcMethods: false,
})

export const getHtmlFromHtmlPageCases: GetHtmlFromHtmlPageCaseType[] = [
  {
    index: 5,
    description: 'basic test getHtmlFromHtmlPage',
    params: {
      url: 'https://accounts.google.com/o/oauth2/v2/auth?client_id=756709380715-92ni8gbaiddbee18c1l63pjeu0pc1u27.apps.googleusercontent.com&redirect_uri=http://localhost:3000/oauth2callback&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutubepartner&access_type=offline&prompt=consent',
    },
    options: { waitForTimeout: 2000, isHeadless: false, isLaunchPersistentContext: true },
    expected: { html: '' },
  },
  {
    index: 4,
    description: 'basic test getHtmlFromHtmlPage',
    params: {
      url: 'https://en.wikipedia.org/wiki/Arkady_and_Boris_Strugatsky?ids=firstHeading&ss=#content > div.layout__header.reference-layout__header > section&from_s=section[data-mw-section-id="0"]&to_s=section[data-mw-section-id="4"]',
    },
    options: { waitForTimeout: 2000, isHeadless: true },
    expected: { html: '' },
  },
  {
    index: 3,
    description: 'basic test getHtmlFromHtmlPage',
    params: {
      url: 'https://en.wikipedia.org/wiki/Arkady_and_Boris_Strugatsky',
    },
    options: { waitForTimeout: 2000, isHeadless: true },
    expected: { html: '' },
  },
  {
    index: 2,
    description: 'basic test getHtmlFromHtmlPage',
    params: {
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while',
    },
    options: {
      waitForTimeout: 2000,
      isHeadless: true,
      isWaitingForLoad: true,
      isFlattenShadowDom: true,
    },
    expected: { html: '' },
  },
  {
    index: 1,
    description: 'basic test getHtmlFromHtmlPage',
    params: {
      url: 'https://www.linkedin.com/jobs/search/?currentJobId=4455964714&keywords=javascript',
    },
    options: {
      waitForTimeout: 2000,
      isLaunchPersistentContext: true,
      isHeadless: true,
    },
    expected: { html: '' },
    // const match = output.html.match(/([\d,]+)\s+results\b/i)
    // const count = match ? Number(match[1].replaceAll(',', '')) : null
  },
  {
    index: 0,
    description: 'basic test getHtmlFromHtmlPage',
    params: {
      url: 'https://example.com',
    },
    options: { waitForTimeout: 2000, isHeadless: false },
    expected: { html: '' },
  },
]
