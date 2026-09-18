import { join } from 'node:path'
import { getDateString } from 'yourails_common'
import type { GetHtmlPageHtmlCaseType, GetHtmlPageHtmlParamsType } from './getHtmlPageHtml'

const dateString = getDateString({
  timestamp: new Date(),
  dash: true,
  hours: true,
  minutes: true,
  seconds: true,
  isUtcMethods: false,
})

export const getHtmlPageHtmlCases: GetHtmlPageHtmlCaseType[] = [
  {
    index: 2,
    description: 'basic test getHtmlPageHtml',
    params: {
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while',
    },
    options: {
      waitForTimeout: 2000,
      isHeadless: true,
      isWaitingForLoad: false,
      isFlattenShadowDom: false,
    },
    expected: { html: '' },
  },
  {
    index: 1,
    description: 'basic test getHtmlPageHtml',
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
    description: 'basic test getHtmlPageHtml',
    params: {
      url: 'https://example.com',
    },
    options: { waitForTimeout: 2000, isHeadless: false },
    expected: { html: '' },
  },
]
