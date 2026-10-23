import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           export const getDirFilesListedCases: GetDirFilesListedCaseType[] = [
             {
               index: 0,
               description: 'basic test getValidatedEntityLinksFilesReadable',
               params: {},
               options: {},
               expected: '',
             },
           ]
 */

type GetDirFilesListedParamsType = { pathDirAbs: string }

type GetDirFilesListedOptionsType = { filter?: (srcPath: string) => boolean; funcParent?: string }

type GetDirFilesListedResType = string[]

type GetDirFilesListedType = (
  params: GetDirFilesListedParamsType,
  options?: GetDirFilesListedOptionsType,
) => Promise<GetDirFilesListedResType>

const optionsDefault = {
  filter: () => true,
  funcParent: 'getDirFilesListed',
} satisfies Required<GetDirFilesListedOptionsType>

const resDefault: GetDirFilesListedResType = []

/**
 * @description Function to getDirFilesListed returns array of absolute paths of all files in the directory (recursive)
 *
 * @param {GetDirFilesListedParamsType} params - Required parameters
 * @param {string} params.pathDirAbs - Absolute path of the directory to scan
 *
 * @param {GetDirFilesListedOptionsType} [options] - Optional settings, merged over the defaults
 * @param {(srcPath: string) => boolean} [options.filter] - Predicate called with the absolute path of each file; return `true` to include it. Applied to files only, directories are always traversed. Default: `() => true`
 * @param {string} [options.funcParent] - Name of the calling function, used as a prefix in error messages. Default: `'getDirFilesListed'`
 *
 * @returns {Promise<GetDirFilesListedResType>} Absolute paths of all files that passed the filter (empty array if none). Order is not guaranteed
 *
 * @throws {Error} If `pathDirAbs` is not an absolute path
 * @throws {Error} Any fs error from reading the directory (e.g. `ENOENT`, `EACCES`, `ENOTDIR`)
 *
 * @remarks
 * - Symlinks and other non-regular entries are skipped, which also avoids symlink cycles
 * - Returned paths are normalized via `path.resolve`
 *
 * @usage
   import { getDirFilesListed, GetDirFilesListedParamsType, GetDirFilesListedOptionsType, GetDirFilesListedResType } from '../getDirFilesListed/getDirFilesListed'
   const getDirFilesListedParams: GetDirFilesListedParamsType = { pathDirAbs: '/abs/path/to/dir' }
   const getDirFilesListedOptions: GetDirFilesListedOptionsType = { filter: (srcPath) => srcPath.endsWith('.ts') }
   const files: GetDirFilesListedResType = await getDirFilesListed(getDirFilesListedParams, getDirFilesListedOptions)
 *
 * @example
   // Only .json files, with a custom caller name for error messages
   const files = await getDirFilesListed(
     { pathDirAbs: '/abs/path/to/dir' },
     { filter: (srcPath) => srcPath.endsWith('.json'), funcParent: 'myCaller' },
   )
 */
const getDirFilesListedUnsafe: GetDirFilesListedType = async (
  { pathDirAbs }: GetDirFilesListedParamsType,
  options: GetDirFilesListedOptionsType = optionsDefault,
) => {
  // Merge instead of replacing, so a partial options object keeps the other defaults
  const { filter, funcParent } = { ...optionsDefault, ...options }

  if (!path.isAbsolute(pathDirAbs)) {
    throw new Error(`${funcParent}: pathDirAbs must be absolute, got "${pathDirAbs}"`)
  }

  const walk = async (dirAbs: string): Promise<GetDirFilesListedResType> => {
    const entries = await readdir(dirAbs, { withFileTypes: true })

    const nested = await Promise.all(
      entries.map(async (entry): Promise<GetDirFilesListedResType> => {
        const entryAbs = path.join(dirAbs, entry.name)

        if (entry.isDirectory()) return walk(entryAbs)
        // Symlinks and other special entries are skipped (avoids symlink cycles)
        if (entry.isFile() && filter(entryAbs)) return [entryAbs]
        return []
      }),
    )

    return nested.flat()
  }

  return walk(path.resolve(pathDirAbs))
}

type GetDirFilesListedCaseType = {
  index: number
  description?: string
  params: Parameters<typeof getDirFilesListed>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getDirFilesListed>[1]
  expected: ReturnType<typeof getDirFilesListed>
}

const getDirFilesListed = withTryCatchFinallyWrapper<
  GetDirFilesListedParamsType,
  GetDirFilesListedOptionsType,
  GetDirFilesListedResType
>(getDirFilesListedUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export type {
  GetDirFilesListedCaseType,
  GetDirFilesListedOptionsType,
  GetDirFilesListedParamsType,
  GetDirFilesListedResType,
  GetDirFilesListedType,
}
export { getDirFilesListed }
