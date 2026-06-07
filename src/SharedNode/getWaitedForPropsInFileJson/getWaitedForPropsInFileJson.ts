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
  pathFileAbs: string
  timeoutMs?: number
  minSizeBytes?: number
  stableMs?: number
  objPropsPath?: string
  propsArr?: string[]
  comment?: string
}

type GetWaitedForPropsInFileJsonOptionsType = { funcParent?: string }

type GetWaitedForPropsInFileJsonResType = string | Error

type GetWaitedForPropsInFileJsonType = (
  params: GetWaitedForPropsInFileJsonParamsType,
  options?: GetWaitedForPropsInFileJsonOptionsType,
) => Promise<GetWaitedForPropsInFileJsonResType>

const optionsDefault = {
  funcParent: 'getWaitedForPropsInFileJson',
} satisfies Required<GetWaitedForPropsInFileJsonOptionsType>

const resDefault: GetWaitedForPropsInFileJsonResType = new Error()

/**
 * @description Function to getWaitedForPropsInFileJson
 * @import import { getWaitedForPropsInFileJson } from './getWaitedForPropsInFileJson'
 * @run npx tsx src/Shared/getWaitedForPropsInFileJson.ts
 * @test pnpm jest getWaitedForPropsInFileJson.test.ts --coverage --collectCoverageFrom="src/SharedNode/getWaitedForPropsInFileJson/getWaitedForPropsInFileJson.ts"
 *     params: { obj: { a: 1 }, objPropsPath: 'b' },
 */
const getWaitedForPropsInFileJsonUnsafe: GetWaitedForPropsInFileJsonType = async (
  {
    pathFileAbs,
    timeoutMs = 15000,
    minSizeBytes = 2,
    stableMs = 333,
    objPropsPath,
    propsArr,
    comment,
  }: GetWaitedForPropsInFileJsonParamsType,
  options: GetWaitedForPropsInFileJsonOptionsType = optionsDefault,
) => {
  await getWaitedForFile({
    pathFileAbs,
    timeoutMs,
    minSizeBytes,
    stableMs,
    comment: `getWaitedForPropsInFileJson [70] pathFileAbs: ${pathFileAbs}`,
  })

  /* No props to check, file readiness is sufficient */
  if (!propsArr?.length) {
    const entity: any = await getReadFile2({ pathFileAbs }, { typeFile: FileTypeEnum.json })
    return entity
  }

  let countDown = timeoutMs

  while (countDown > 0) {
    const entity: any = await getReadFile2({ pathFileAbs }, { typeFile: FileTypeEnum.json })

    const entitySlice: any = objPropsPath
      ? getObjectPropertyValue({ obj: entity, objPropsPath })
      : entity

    // consoler('getWaitedForPropsInFileJson [88]', { entity })

    const items: any[] = Array.isArray(entitySlice) ? entitySlice : [entitySlice]

    const arePropsPresent = items.every((item: any) =>
      propsArr.every((prop: string) => item[prop] !== undefined),
    )

    if (arePropsPresent) return entity

    await timeout(stableMs)
    countDown -= stableMs
  }

  throw new Error(
    `❌ getWaitedForPropsInFileJson: ${comment}, never ready: ${propsArr?.join(', ')}`,
  )
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
