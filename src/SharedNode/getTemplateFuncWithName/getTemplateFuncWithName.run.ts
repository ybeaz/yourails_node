import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { getRunWithSpinner } from 'yourails_node'
import { consoler } from '../../sharedNode/consoler'
import {
  type GetTemplateFuncWithNameParamsType,
  getTemplateFuncWithName,
} from './getTemplateFuncWithName'

/* Define the command-line options using yargs */
const options: any = yargs(hideBin(process.argv))
  .option('name', {
    alias: 'n',
    describe: 'new function name', // [start:dev, start:dev:local]
    type: 'string',
  })
  .option('to', {
    alias: 't', // Alias for the -to
    describe: 'abs path to folder destination', // [see README.md] ['verbose']
    type: 'string', // Data type of the option's value (string in this case)
  })
  .option('from', {
    alias: 'f', // Alias for the -from
    describe: 'abs path to folder source', // [see README.md] ['verbose']
    type: 'string', // Data type of the option's value (string in this case)
  })
  .help()
  .alias('help', 'h')
  .parse()

const from = options.from
const to = options.to
const name = options.name

/**
 * @run For yourails_common
 * npx tsx src/sharedNode/getTemplateFuncWithName/getTemplateFuncWithName.run.ts -f /Users/admin/Dev/manuals/templates/getTemplateFunc -t /Users/admin/Dev/yourails_common/src/shared -n getDirListed
 * @run For yourails_node
 * npx tsx src/sharedNode/getTemplateFuncWithName/getTemplateFuncWithName.run.ts -f /Users/admin/Dev/manuals/templates/getTemplateFunc -t /Users/admin/Dev/yourails_node/src/sharedNode/getTemplateFuncWithName/__output__ -n getYoutubePlaylistsCrud
 */
if (require.main === module) {
  void (async () => {
    const getTemplateFuncWithNameParams: GetTemplateFuncWithNameParamsType = { from, to, name }

    const output = await getRunWithSpinner(getTemplateFuncWithName)(getTemplateFuncWithNameParams)

    consoler(`getTemplateFuncWithName [50]`, {
      getTemplateFuncWithNameParams,
      output,
    })
  })()
}
