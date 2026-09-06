import { join } from 'node:path'
import {
  FileTypeEnum,
  GetAssetsFromScenesParamsType,
  getAssetsFromScenes,
  ScenarioSchemaType,
} from 'yourails_common'
import { consoler } from '../consoler'
import { getReadFile2 } from '../getReadFile2/getReadFile2'
import {
  GetWaitedForPropsInFileJsonCaseType,
  getWaitedForPropsInFileJson,
} from './getWaitedForPropsInFileJson'
import { getWaitedForPropsInFileJsonCases } from './getWaitedForPropsInFileJson.case'

/**
 * @run npx tsx src/SharedNode/getWaitedForPropsInFileJson/getWaitedForPropsInFileJson.run.ts
 */
if (require.main === module) {
  ;(async () => {
    const promises = getWaitedForPropsInFileJsonCases.map(
      async (test: GetWaitedForPropsInFileJsonCaseType, index: number) => {
        const { description, params, options, expected } = test

        const PATH_SCENARIOS = '/Users/admin/Dev/yourails_scenarios'
        const PARH_BASE = '2026-08-15-19-19-10-p_0-Create-an-ssh-key-generate-an'

        const pathFileAbsScenario = join(PATH_SCENARIOS, PARH_BASE, 'scenario.json')
        const scenario = (await getReadFile2(
          { pathFileAbs: pathFileAbsScenario },
          { fileType: FileTypeEnum.json },
        )) as ScenarioSchemaType

        const getAssetsFromScenesParams: GetAssetsFromScenesParamsType = {
          scenes: scenario.scenes,
          pathNameVariables: 'variables_2026_07_01_WhatIsXxxProgrammingFeature_16x9',
        }
        const assets = getAssetsFromScenes(getAssetsFromScenesParams)
        params.entity = { assets }
        params.objPropsPath = 'assets'

        consoler('getWaitedForPropsInFileJson.run [40]', { params })

        const output = await getWaitedForPropsInFileJson(params, options)

        consoler(`getWaitedForPropsInFileJson [90-${index}]`, {
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
