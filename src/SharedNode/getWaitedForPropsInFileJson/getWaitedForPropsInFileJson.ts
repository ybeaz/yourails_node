import {
  FileTypeEnum,
  FuncModeEnumType,
  getObjectPropertyValue,
  timeout,
  withTryCatchFinallyWrapper,
} from 'yourails_common'
import { consoler } from '../consoler'
import { getReadFile2 } from '../getReadFile2/getReadFile2'
import { getWaitedForFile } from '../getWaitedForFile/getWaitedForFile'
import { isDirectoryFile } from '../isDirectoryFile'

/**
 * @prompt Context: Unit tests typescript challenge
 *         Question: Suggest unit test data to test the function with the description below
 *         Format: Follow the format of the array of test-objects below
          [
            {
              description: 'basic test getWaitedForPropsInFileJson',
              params: {},
              options: {},
              expected: '',
            },
          ]
 */

type GetWaitedForPropsInFileJsonParamsType = {
  entity?: any
  pathFileAbs?: string
  timeoutMs?: number
  minSizeBytes?: number
  stableMs?: number
  objPropsPath?: string
  propsArr?: string[]
  comment?: string
}

type GetWaitedForPropsInFileJsonOptionsType = { funcParent?: string }

type GetWaitedForPropsInFileJsonResType = {
  isSuccess: boolean
  message: string
}

type GetWaitedForPropsInFileJsonType = (
  params: GetWaitedForPropsInFileJsonParamsType,
  options?: GetWaitedForPropsInFileJsonOptionsType,
) => Promise<GetWaitedForPropsInFileJsonResType>

const optionsDefault = {
  funcParent: 'getWaitedForPropsInFileJson',
} satisfies Required<GetWaitedForPropsInFileJsonOptionsType>

const resDefault: GetWaitedForPropsInFileJsonResType = {
  isSuccess: true,
  message: '',
}

/**
 * @description Function to getWaitedForPropsInFileJson
 * @import import { getWaitedForPropsInFileJson } from './getWaitedForPropsInFileJson'
 * @run npx tsx src/Shared/getWaitedForPropsInFileJson.ts
 * @test pnpm jest getWaitedForPropsInFileJson.test.ts --coverage --collectCoverageFrom="src/SharedNode/getWaitedForPropsInFileJson/getWaitedForPropsInFileJson.ts"
 *     params: { obj: { a: 1 }, objPropsPath: 'b' },
 */
const getWaitedForPropsInFileJsonUnsafe: GetWaitedForPropsInFileJsonType = async ({
  entity: entityIn,
  pathFileAbs = '',
  timeoutMs = 15000,
  minSizeBytes = 2,
  stableMs = 333,
  objPropsPath,
  propsArr = [],
  comment,
}: GetWaitedForPropsInFileJsonParamsType) => {
  let entity = entityIn

  if (!entityIn) {
    await getWaitedForFile({
      pathFileAbs,
      timeoutMs,
      minSizeBytes,
      stableMs,
      comment: `getWaitedForPropsInFileJson [70] pathFileAbs: ${pathFileAbs}`,
    })

    /* No props to check, file readiness is sufficient */
    if (!propsArr?.length) {
      return {
        isSuccess: true,
        message: `✅ getWaitedForPropsInFileJson [80]: ${comment},\nno props specified: check propsArr\nscenario: ${pathFileAbs}`,
      }
    }

    entity = await getReadFile2({ pathFileAbs }, { fileType: FileTypeEnum.json })
  }

  let countDown = timeoutMs
  let lastItems: any[] = [] // capture most recent items for timeout diagnostics

  while (countDown > 0) {
    const entitySlice: any = objPropsPath
      ? getObjectPropertyValue({ obj: entity, objPropsPath })
      : entity

    const items: any[] = Array.isArray(entitySlice) ? entitySlice : [entitySlice]
    lastItems = items

    const arePropsPresent = items.every((item: any) =>
      propsArr.every((prop: string) => {
        return Array.isArray(item[prop]) ? item[prop].length : item[prop] !== undefined
      }),
    )

    if (arePropsPresent) {
      const log: string[] = []

      for await (const item of items) {
        for await (const prop of propsArr) {
          if (Array.isArray(item[prop])) {
            for await (const value of item[prop]) {
              const { isError, isExisting } = await isDirectoryFile({ path: value })
              if (!isExisting || isError) log.push(value)
            }
          } else {
            const { isError, isExisting } = await isDirectoryFile({ path: item[prop] })
            if (!isExisting || isError) log.push(item[prop])
          }
        }
      }

      if (log.length) {
        return {
          isSuccess: false,
          message: `❌ getWaitedForPropsInFileJson [120]: ${comment},\nscenario: ${pathFileAbs}\npathsAbs are not valid: ${log?.join(', ')}`,
        }
      }

      return {
        isSuccess: true,
        message: `✅ getWaitedForPropsInFileJson [140]: ${comment}\nscenario: ${pathFileAbs}\nprops are ready: ${propsArr?.join(', ')}`,
      }
    }

    await timeout(stableMs)
    countDown -= stableMs
  }

  const missingLog: string[] = []
  lastItems.forEach((item: any, index: number) => {
    propsArr.forEach((prop: string) => {
      const isMissing = Array.isArray(item[prop]) ? !item[prop].length : item[prop] === undefined
      if (isMissing) {
        const itemLabel = item?.sceneIndex ?? item?.pathNameVariables ?? `item[${index}]`
        missingLog.push(`${itemLabel} → ${prop}`)
      }
    })
  })

  return {
    isSuccess: false,
    message: `❌ getWaitedForPropsInFileJson [150]: ${comment}\nscenario: ${pathFileAbs}\nprops are never ready (AND/OR): ${propsArr?.join(', ')}\nmissing: ${missingLog.join(', ')}`,
  }
}

const getWaitedForPropsInFileJson = withTryCatchFinallyWrapper<
  GetWaitedForPropsInFileJsonParamsType,
  GetWaitedForPropsInFileJsonOptionsType,
  GetWaitedForPropsInFileJsonResType
>(getWaitedForPropsInFileJsonUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetWaitedForPropsInFileJsonCaseType = {
  description?: string
  params: Parameters<typeof getWaitedForPropsInFileJson>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options: Parameters<typeof getWaitedForPropsInFileJson>[1]
  expected: ReturnType<typeof getWaitedForPropsInFileJson>
}

export type {
  GetWaitedForPropsInFileJsonCaseType,
  GetWaitedForPropsInFileJsonOptionsType,
  GetWaitedForPropsInFileJsonParamsType,
  GetWaitedForPropsInFileJsonResType,
  GetWaitedForPropsInFileJsonType,
}
export { getWaitedForPropsInFileJson }
