import { getRunWithSpinner } from 'yourails_node'
import { consoler } from '../../sharedNode/consoler'
import {
  type GetUpdatedEnvFileCaseType,
  type GetUpdatedEnvFileOptionsType,
  type GetUpdatedEnvFileParamsType,
  getUpdatedEnvFile,
} from './getUpdatedEnvFile'
import { getUpdatedEnvFileCases } from './getUpdatedEnvFile.case'

/**
 * @run npx tsx src/sharedNode/getUpdatedEnvFile/getUpdatedEnvFile.run.ts
 */
if (require.main === module) {
  void (async () => {
    for await (const {
      index,
      description,
      params: getUpdatedEnvFileParams,
      options: getUpdatedEnvFileOptions,
      expected: _,
    } of getUpdatedEnvFileCases) {
      const CASE_TO_PICK_UP = 0

      if (index !== CASE_TO_PICK_UP) continue

      const pathFileAbs =
        '/Users/admin/Dev/yourails_node/src/sharedNode/getUpdatedEnvFile/__output__/.env.development'

      const output = await getRunWithSpinner(getUpdatedEnvFile)(
        {
          pathFileAbs,
          updates: {
            APP_IP: '127.0.0.2',
            APP_PORT: 4001,
          },
        },
        getUpdatedEnvFileOptions,
      )

      consoler(`getUpdatedEnvFile [30-${index}]`, {
        index,
        description,
        getUpdatedEnvFileParams,
        getUpdatedEnvFileOptions,
        output,
      })
    }
  })()
}
