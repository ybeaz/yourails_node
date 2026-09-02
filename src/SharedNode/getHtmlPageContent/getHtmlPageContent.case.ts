import { join } from 'node:path'
import { getDateString } from 'yourails_common'
import type { GetHtmlPageContentCaseType, GetHtmlPageContentParamsType } from './getHtmlPageContent'

const dateString = getDateString({
  timestamp: new Date(),
  dash: true,
  hours: true,
  minutes: true,
  seconds: true,
  isUtcMethods: false,
})

export const getHtmlPageContentCases: GetHtmlPageContentCaseType[] = [
  {
    description: 'basic test getHtmlPageContent',
    params: {
      url: 'https://www.linkedin.com/jobs/search/?currentJobId=4455964714&keywords=javascript',
    },
    options: {
      waitForTimeout: 2000,
      isLaunchPersistentContext: true,
      isHeadless: true,
      pathFileAbs: join(__dirname, '__output__', `${dateString}_linkedin.html`),
    },
    expected: { html: '' },
  },
  // {
  //   description: 'basic test getHtmlPageContent',
  //   params: {
  //     url: 'https://example.com',
  //     pathFileAbsOutput: join(__dirname, '__output__', `${dateString}_page.html`),
  //   },
  //   options: { waitForTimeout: 2000, isHeadless: false },
  //   expected: { html: '' },
  // },
]
