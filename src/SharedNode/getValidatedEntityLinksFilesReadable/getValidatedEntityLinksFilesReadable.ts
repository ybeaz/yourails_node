import { constants } from 'node:fs'
import { access } from 'node:fs/promises'

import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'
import { getEnsuredReadable } from '../getImageNormalized/getEnsuredReadable'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           [
             {
               description: 'basic test getValidatedEntityLinksFilesReadable',
              params: {},
               options: {},
               expected: '',
             },
           ]
 */

type GetValidatedEntityLinksFilesReadableParamsType = {
  schema: any
  entity: any
}

type GetValidatedEntityLinksFilesReadableOptionsType = { funcParent?: string }

type GetValidatedEntityLinksFilesReadableResType = unknown

type GetValidatedEntityLinksFilesReadableType = (
  params: GetValidatedEntityLinksFilesReadableParamsType,
  options?: GetValidatedEntityLinksFilesReadableOptionsType,
) => GetValidatedEntityLinksFilesReadableResType

const optionsDefault = {
  funcParent: 'getValidatedEntityLinksFilesReadable',
} satisfies Required<GetValidatedEntityLinksFilesReadableOptionsType>

const resDefault: GetValidatedEntityLinksFilesReadableResType = ''

/**
 * @description Function to check that all schema properties (if they have true value in the schema and
 *              are NOT undefined in the entity) represent the readable files's links
 *              with try { await access(pathFileAbsInput, constants.R_OK) } catch(error: any) { ... } 
 *                or some other way  
 *              For example
 *              params {
                  schema: {
                     propName01: true,
                     propName02: true,
                     arrayName03: [{ propName03: true }, { propName04: true }]
                  },
                  entity: {
                   propName01: '/my/path/image.png',
                   propName04: 5,
                   arrayName03: [
                     { propName03: 'my/another/path/file.json',  
                       propName04: 'my/some/path/image03.png',
                     },
                     { propName06: 'not in the scema string - OK',
                       propName04: 'my/wrong/path/doesNotExist06.png',
                     },
                     { propName03: 'my/another/path/file01.json',
                       propName04: 'my/some/path/image03.png',
                     },
                   ]
                 }
               
                outcome: {
                 arrayName03: [
                  {
                    propName04: 'my/wrong/path/doesNotExist06.png',
                  },
                 ]
                }
 * 
 * @import import { getValidatedEntityLinksFilesReadable, GetValidatedEntityLinksFilesReadableParamsType, GetValidatedEntityLinksFilesReadableOptionsType } from './getValidatedEntityLinksFilesReadable/getValidatedEntityLinksFilesReadable'
 */
const getValidatedEntityLinksFilesReadableUnsafe: GetValidatedEntityLinksFilesReadableType = async (
  { schema, entity }: GetValidatedEntityLinksFilesReadableParamsType,
  options: GetValidatedEntityLinksFilesReadableOptionsType = optionsDefault,
) => {
  const result: Record<string, any> = {}

  for (const key of Object.keys(schema)) {
    const schemaValue = schema[key]
    const entityValue = entity?.[key]

    // detect [true] — array of path strings in the entity
    if (Array.isArray(schemaValue) && schemaValue.length === 1 && schemaValue[0] === true) {
      if (!Array.isArray(entityValue)) continue

      const failedPaths: string[] = []
      for (const pathItem of entityValue) {
        if (pathItem === undefined) continue
        try {
          await access(pathItem, constants.R_OK)
        } catch {
          failedPaths.push(pathItem)
        }
      }

      if (failedPaths.length > 0) {
        result[key] = failedPaths
      }

      continue
    }

    // ── Array branch: merge all schema item objects, check each entity item ──
    if (Array.isArray(schemaValue)) {
      if (!Array.isArray(entityValue)) continue

      // Merge [{ propA: true }, { propB: true }] → { propA: true, propB: true }
      const mergedItemSchema = Object.assign({}, ...schemaValue)

      const failedItems: Record<string, any>[] = []

      for (const entityItem of entityValue) {
        const itemFailures = (await getValidatedEntityLinksFilesReadableUnsafe(
          { schema: mergedItemSchema, entity: entityItem },
          options,
        )) as Record<string, any>

        if (Object.keys(itemFailures).length > 0) {
          failedItems.push(itemFailures)
        }
      }

      if (failedItems.length > 0) {
        result[key] = failedItems
      }

      continue
    }

    // ── Leaf branch: schema value is `true` ──
    if (schemaValue === true) {
      // Skip properties absent from the entity
      if (entityValue === undefined) continue

      try {
        await access(entityValue, constants.R_OK)
        // Readable → no failure, omit from result
      } catch {
        // Not readable → record the failing path
        result[key] = entityValue
      }

      continue
    }

    // ── Nested-object branch (not shown in example, but supported for completeness) ──
    if (schemaValue !== null && typeof schemaValue === 'object') {
      const nestedFailures = (await getValidatedEntityLinksFilesReadableUnsafe(
        { schema: schemaValue, entity: entityValue },
        options,
      )) as Record<string, any>

      if (Object.keys(nestedFailures).length > 0) {
        result[key] = nestedFailures
      }
    }
  }

  return result
}

const getValidatedEntityLinksFilesReadable = withTryCatchFinallyWrapper<
  GetValidatedEntityLinksFilesReadableParamsType,
  GetValidatedEntityLinksFilesReadableOptionsType,
  GetValidatedEntityLinksFilesReadableResType
>(getValidatedEntityLinksFilesReadableUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetValidatedEntityLinksFilesReadableCaseType = {
  description?: string
  mockReadablePaths: string[]
  params: Parameters<typeof getValidatedEntityLinksFilesReadable>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getValidatedEntityLinksFilesReadable>[1]
  expected: ReturnType<typeof getValidatedEntityLinksFilesReadable>
}

export type {
  GetValidatedEntityLinksFilesReadableCaseType,
  GetValidatedEntityLinksFilesReadableOptionsType,
  GetValidatedEntityLinksFilesReadableParamsType,
  GetValidatedEntityLinksFilesReadableResType,
  GetValidatedEntityLinksFilesReadableType,
}
export { getValidatedEntityLinksFilesReadable }
