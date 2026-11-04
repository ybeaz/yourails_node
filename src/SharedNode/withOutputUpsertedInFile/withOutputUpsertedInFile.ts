import { join } from 'node:path'
import { nanoid } from 'nanoid'
import {
  FileTypeEnum,
  GetFoundObjectArrayByPropParamsType,
  GetUpsertedObjectArrayByPropOptionsType,
  GetUpsertedObjectArrayByPropParamsType,
  getFoundObjectArrayByProp,
  getUpsertedObjectArrayByProp,
  isObjectEmpty,
} from 'yourails_common'
import { consoler } from '../consoler'
import { getReadFile2 } from '../getReadFile2/getReadFile2'
import { getRunWithSpinner } from '../getRunWithSpinner/getRunWithSpinner'
import {
  GetWrittenFile3OptionsType,
  GetWrittenFile3ParamsType,
  getWrittenFile3,
} from '../getWrittenFile3/getWrittenFile3'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           export const withOutputUpsertedInFileCases: WithOutputUpsertedInFileCaseType[] = [
             {
               index: 0,
               description: 'basic test getValidatedEntityLinksFilesReadable',
               params: {},
               options: {},
               expected: '',
             },
           ]
 */

type WithOutputUpsertedInFileParamsType<R> = {
  pathFileAbsIn: string
  propName: keyof R & string
  pathFileAbsOut?: string
  idName?: string
  fileType?: FileTypeEnum
}

// Per-path serialization (single-process only)
const locks = new Map<string, Promise<unknown>>()
const withFileLock = <T>(key: string, task: () => Promise<T>): Promise<T> => {
  const prev = locks.get(key) ?? Promise.resolve()
  const next = prev.then(task, task)
  locks.set(
    key,
    next.catch(() => undefined),
  )
  return next
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

/**
 * @description Decorator that wraps a function so its output is upserted into a file (JSON by default).
 * After the wrapped function resolves, the target file is read, the output is upserted into the array
 * by `propName` (existing props are kept), and the file is written back.
 *
 * @remarks
 * - Returns the whole upserted array, not the wrapped function's own output.
 * - The read, upsert and write steps are serialized per target path within one Node process.
 *   Multiple processes writing the same file are not protected.
 * - A missing input file (`ENOENT`) is treated as an empty array.
 * - Existing props on a matched entity are preserved (`isKeepingExistingProps: true`).
 * - If `pathFileAbsOut` is omitted, the input file is overwritten in place.
 *
 * @param {WithOutputUpsertedInFileParamsType<R>} params
 * @param {string} params.pathFileAbsIn - Absolute path of the file to read existing entities from
 * @param {keyof R & string} params.propName - Property used as the unique key when upserting (e.g. 'id')
 * @param {string} [params.pathFileAbsOut] - Absolute path to write to. Defaults to `pathFileAbsIn`
 * @param {string} [params.idName] - Name of the id that should be added to the newly inserted object
 * @param {FileTypeEnum} [params.fileType=FileTypeEnum.json] - File format used for reading and writing
 *
 * @param {(p: P, o: O) => R | Promise<R>} func - Function to decorate. Must return an object containing `propName`
 *
 * @returns {(p: P, o: O) => Promise<R[]>} Decorated function with the same arguments as `func`.
 * Resolves to the full array of entities as written to the file
 *
 * @throws {Error} If `func` output is not an object or lacks `propName`
 * @throws {Error} If the input file exists but does not contain an array
 * @throws {Error} Any error from reading or writing the file other than `ENOENT` on read
 *
 * @usage
   import {
     withOutputUpsertedInFile,
     WithOutputUpsertedInFileParamsType,
   } from '../withOutputUpsertedInFile/withOutputUpsertedInFile'

   const withOutputUpsertedInFileParams: WithOutputUpsertedInFileParamsType<User> = {
     pathFileAbsIn: '/abs/path/users.json',
     propName: 'id',
   }
   const getUserSaved = withOutputUpsertedInFile(withOutputUpsertedInFileParams)(getUser)
   const users = await getUserSaved({ id: 1 }, {})
 *
 * @example
   // Upsert into a separate output file as JSON
   const getUserSaved = withOutputUpsertedInFile<{ id: number }, {}, User>({
     pathFileAbsIn: '/abs/in/users.json',
     pathFileAbsOut: '/abs/out/users.json',
     propName: 'id',
     fileType: FileTypeEnum.json,
   })(getUser)
 *
 * @see getReadFile2
 * @see getUpsertedObjectArrayByProp
 * @see getWrittenFile3
 */
const withOutputUpsertedInFile =
  <P, O, R extends Record<string, unknown>>({
    pathFileAbsIn,
    pathFileAbsOut,
    propName,
    idName,
    fileType = FileTypeEnum.json,
  }: WithOutputUpsertedInFileParamsType<R>) =>
  (func: (p: P, o?: O) => R | Promise<R>) =>
  async (p: P, o?: O): Promise<R> => {
    const output = await func(p, o)
    const insertID = nanoid()

    if (!isRecord(output) || output[propName] === undefined) {
      throw new Error(`withOutputUpsertedInFile: output must be an object with "${propName}"`)
    }

    const pathFileAbsTarget = pathFileAbsOut ?? pathFileAbsIn

    return withFileLock(pathFileAbsTarget, async () => {
      let entitiesIn: R[]
      try {
        const raw = await getReadFile2({ pathFileAbs: pathFileAbsIn }, { fileType })
        if (!Array.isArray(raw)) throw new Error(`${pathFileAbsIn} does not contain an array`)
        entitiesIn = raw as R[]
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e
        entitiesIn = []
      }

      const getUpsertedObjectArrayByPropParams: GetUpsertedObjectArrayByPropParamsType = {
        arr: entitiesIn,
        propName,
        obj: output,
      }
      const getUpsertedObjectArrayByPropOptions: GetUpsertedObjectArrayByPropOptionsType = {
        isKeepingExistingProps: true,
        insertID,
        idName,
      }

      const entitiesOut = (await getUpsertedObjectArrayByProp(
        getUpsertedObjectArrayByPropParams,
        getUpsertedObjectArrayByPropOptions,
      )) as R[]

      await getWrittenFile3({ pathFileAbs: pathFileAbsTarget, data: entitiesOut }, { fileType })

      const propVal = output[propName]
      const getFoundObjectArrayByPropParams: GetFoundObjectArrayByPropParamsType = {
        arr: entitiesOut,
        propName,
        propValue: `${propVal}_${insertID}`,
        propNameTarget: undefined,
      }
      let entityOut = getFoundObjectArrayByProp(getFoundObjectArrayByPropParams)

      if (!entityOut || isObjectEmpty(entityOut)) {
        const getFoundObjectArrayByPropParams: GetFoundObjectArrayByPropParamsType = {
          arr: entitiesOut,
          propName,
          propValue: propVal,
          propNameTarget: undefined,
        }
        entityOut = getFoundObjectArrayByProp(getFoundObjectArrayByPropParams)
      }

      return entityOut
    })
  }

export type { WithOutputUpsertedInFileParamsType }
export { withOutputUpsertedInFile }
