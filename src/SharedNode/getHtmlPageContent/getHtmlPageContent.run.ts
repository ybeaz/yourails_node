import { consoler } from 'yourails_node/consoler'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import {
  type GetHtmlPageContentCaseType,
  type GetHtmlPageContentOptionsType,
  type GetHtmlPageContentParamsType,
  getHtmlPageContent,
} from './getHtmlPageContent'
import { getHtmlPageContentCases } from './getHtmlPageContent.case'

/**
 * @run npx tsx src/SharedNode/getHtmlPageContent/getHtmlPageContent.run.ts
 */
if (require.main === module) {
  void (async () => {
    const promises = getHtmlPageContentCases.map(
      async (
        { description, params, options, expected }: GetHtmlPageContentCaseType,
        index: number,
      ) => {
        const output = await getRunWithSpinner(getHtmlPageContent, 'Processing... ')(
          params,
          options,
        )

        const match = output.html.match(/([\d,]+)\s+results\b/i)
        const count = match ? Number(match[1].replaceAll(',', '')) : null

        consoler(`getHtmlPageContent [90-${index}]`, {
          description,
          params,
          output,
          count,
          expected,
          tested: JSON.stringify(output) === JSON.stringify(expected),
        })
      },
    )

    await Promise.all(promises)
  })()
}
