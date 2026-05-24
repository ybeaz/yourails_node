import { join } from 'node:path'
import { getDateString } from 'yourails_common'
import { type GetImageFromHtmlCaseType, getImageFromHtml } from './getImageFromHtml'

/**
 * @run npx tsx src/Shared/getImageFromHtml.run.ts
 */
if (require.main === module) {
  ;(async () => {
    const getImageFromHtmlCases = await import('./getImageFromHtml.case').then(
      (m) => m.getImageFromHtmlCases,
    )

    const promises = getImageFromHtmlCases.map(
      async (
        {
          description,
          params,
          options = { isProduction: false },
          expected,
        }: GetImageFromHtmlCaseType,
        index: number,
      ) => {
        const SCALE = 2
        const IS_PRODUCTION = true // 'What Is Sora? ggg, yyy, ppp'
        const __TITLE_MAIN_FORMATTED__ =
          'OpenClaw Foundation<br />OpenClaw project<br />at a glance'

        const SCENE_INDEX = 0

        const dateString = getDateString({
          timestamp: new Date(),
          dash: true,
          hours: true,
          minutes: true,
          seconds: true,
          isUtcMethods: false,
        })
        const fileNameMain = `s_${SCENE_INDEX}_${dateString}`
        const pathFileAbsImageTitle = join(
          __dirname,
          '.',
          '__output__',
          `${fileNameMain}_image.png`,
        )

        params.pathFileAbs = pathFileAbsImageTitle
        params.html = __TITLE_MAIN_FORMATTED__
        params.scale = SCALE

        options.isProduction = IS_PRODUCTION

        const output = await getImageFromHtml(params, options)

        console.log(`getImageFromHtml [90-${index}]`, {
          description,
          params,
          output,
          expected,
          tested: JSON.stringify(output) === JSON.stringify(expected),
        })
      },
    )

    await Promise.all(promises)
  })()
}
