// @ts-nocheck
import {
  GetWaitedForPropsInFileJsonTestType,
  getWaitedForPropsInFileJson,
} from './getWaitedForPropsInFileJson'

/**
 * @run npx tsx src/Shared/getWaitedForPropsInFileJson.ts
 * @test pnpm jest getWaitedForPropsInFileJson.test.ts --coverage --collectCoverageFrom="src/Shared/getWaitedForPropsInFileJson.ts"
 */
if (require.main === module) {
  ;(async () => {
    const getWaitedForPropsInFileJsonCases = await import(
      './getWaitedForPropsInFileJson.case'
    ).then((m) => m.getWaitedForPropsInFileJsonCases)

    const promises = getWaitedForPropsInFileJsonCases.map(
      async (test: GetWaitedForPropsInFileJsonTestType, index: number) => {
        const { description, params, options, expected } = test

        const output = await getWaitedForPropsInFileJson(params, options)

        console.log(`getWaitedForPropsInFileJson [90-${index}]`, {
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
