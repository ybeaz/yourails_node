import process from 'node:process'
import { timeout } from 'yourails_common'
import { consoler } from '../consoler'
import { getRunWithSpinner } from './getRunWithSpinner'

/**
 * @run npx tsx src/SharedNode/getRunWithSpinner/getRunWithSpinner.run.ts
 */
if (require.main === module) {
  void (async () => {
    const getTimeout = async (params: number, options: unknown) => await timeout(params)

    const output: any = await getRunWithSpinner(getTimeout, 'processing...')(2000)

    consoler(`getRunWithSpinner [100`, {
      isTTY: process.stdout.isTTY,
      stdout: process.stdout.constructor.name,
      TERM: process.env.TERM,
      output,
    })
  })()
}
