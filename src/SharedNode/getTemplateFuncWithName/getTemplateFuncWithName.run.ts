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
  .option('from', {
    alias: 'f', // Alias for the -from
    describe: 'abs path to folder source', // [see README.md] ['verbose']
    type: 'string', // Data type of the option's value (string in this case)
  })
  .strict()
  .option('to', {
    alias: 't', // Alias for the -to
    describe: 'abs path to folder destination', // [see README.md] ['verbose']
    type: 'string', // Data type of the option's value (string in this case)
  })
  .strict()
  .option('namePrev', {
    alias: 'p',
    describe: 'prev function name',
    type: 'string',
  })
  .strict()
  .option('name', {
    alias: 'n',
    describe: 'new function name',
    type: 'string',
  })
  .strict()
  .help()
  .alias('help', 'h')
  .parse()

const from = options.from
const to = options.to
const nameNext = options.name
const namePrev = options.namePrev

/**
 * @run
 * For yourails_common getTemplateFunc
 * npx tsx src/sharedNode/getTemplateFuncWithName/getTemplateFuncWithName.run.ts -f /Users/admin/Dev/manuals/templates/getTemplateFunc -t /Users/admin/Dev/yourails_common/src/shared -n getConnectionSlice -p getTemplateFunc
 *
 * @run
 * For yourails_node getTemplateFunc
 * npx tsx src/sharedNode/getTemplateFuncWithName/getTemplateFuncWithName.run.ts -f /Users/admin/Dev/manuals/templates/getTemplateFunc -t /Users/admin/Dev/yourails_node/src/sharedNode/getTemplateFuncWithName/__output__ -n getConnectionSlice -p getTemplateFunc
 *
 * For yourails_node template
 * npx tsx src/sharedNode/getTemplateFuncWithName/getTemplateFuncWithName.run.ts -f /Users/admin/Dev/yourails-nestjs-server-4/src/modules/templates -t /Users/admin/Dev/yourails_node/src/sharedNode/getTemplateFuncWithName/__output__ -n videoAnswers -p templates
 */
if (require.main === module) {
  void (async () => {
    consoler('getTemplateFuncWithName.run [55]', { from, to, namePrev, nameNext })

    const getTemplateFuncWithNameParams: GetTemplateFuncWithNameParamsType = {
      from,
      to,
      namePrev,
      nameNext,
    }

    const output = await getRunWithSpinner(getTemplateFuncWithName)(getTemplateFuncWithNameParams)

    consoler(`getTemplateFuncWithName [50]`, {
      getTemplateFuncWithNameParams,
      output,
    })
  })()
}
