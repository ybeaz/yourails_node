import { constants, copyFile, mkdir, readdir, readlink, rm, symlink } from 'node:fs/promises'
import path from 'node:path'

import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           export const getDirCopiedCases: GetDirCopiedCaseType[] = [
             {
               index: 0,
               description: 'basic test getValidatedEntityLinksFilesReadable',
               params: {},
               options: {},
               expected: '',
             },
           ]
 */

// Adjust these to match your existing types
type NameDestFilesType = string | ((nameFile: string) => string)

type GetDirCopiedParamsType = {
  pathDirAbsSrc: string
  pathDirAbsDest: string
}

type GetDirCopiedOptionsType = {
  overwrite: boolean
  filter?: (pathAbs: string) => boolean
  nameDestDir?: string
  nameDestFiles?: NameDestFilesType
}

type GetDirCopiedType = (
  params: GetDirCopiedParamsType,
  options?: Partial<GetDirCopiedOptionsType>,
) => Promise<string>

const optionsDefault = {
  nameDestDir: '',
  nameDestFiles: '',
  overwrite: false,
  filter: () => true,
} satisfies Required<GetDirCopiedOptionsType>

type GetDirCopiedResType = unknown

const resDefault: GetDirCopiedResType = ''

/**
 * Recursively copies a directory into `pathDirAbsDest`, optionally renaming the copied
 * directory and the files inside it.
 *
 * The directory is copied *as a directory*: it lands at `pathDirAbsDest/<nameDestDir>`
 * (or `pathDirAbsDest/<basename of pathDirAbsSrc>` when `nameDestDir` is not set), not as loose
 * files directly inside `pathDirAbsDest`. `pathDirAbsDest` is created if it does not exist.
 *
 * Unlike `fs.cp`, this uses a manual recursive copy so files can be renamed.
 * Symlinks are recreated as symlinks. Subdirectory names are never changed;
 * only file names are renamed.
 *
 * @description Copies a directory tree into `pathDirAbsDest`, with optional renaming of the directory and files.
 * @param params - Source and destination paths.
 * @param params.pathDirAbsSrc - Path to the source directory.
 * @param params.pathDirAbsDest - Path to the parent directory the copy is placed in.
 * @param options - Optional copy behavior settings.
 * @param options.overwrite - Overwrite existing files in `pathDirAbsDest`. Defaults to `true`.
 * @param options.filter - Return `true` to copy an entry, `false` to skip it. Called for `pathDirAbsSrc` and every entry inside it. Defaults to `() => true`.
 * @param options.nameDestDir - Name of the copied directory inside `pathDirAbsDest`. Defaults to the basename of `pathDirAbsSrc`.
 * @param options.nameDestFiles - Replaces the part of each file name before the first dot, keeping suffixes and extension (`xxx.test.ts` -> `yyy.test.ts`). Dotfiles and extensionless files are left unchanged. Defaults to no renaming.
 * @returns A promise that resolves with the path of the copied directory (`pathDirAbsDest/<nameDestDir>`).
 * @throws If `pathDirAbsSrc` does not exist, or if `overwrite` is `false` and a destination file already exists (`EEXIST`). Recreating an existing symlink also throws.
 *
 * @usage
   import { getDirCopied, GetDirCopiedParamsType, GetDirCopiedOptionsType, GetDirCopiedResType } from '../getDirCopied/getDirCopied'
   const getDirCopiedParams: GetDirCopiedParamsType = { pathDirAbsSrc: './templates/getTemplateFunc', pathDirAbsDest: './pathDirAbsSrc/output' }
   const getDirCopiedOptions: GetDirCopiedOptionsType = {
     overwrite: false,
     nameDestDir: 'getYoutubePlaylistsCrud',
     nameDestFiles: 'getYoutubePlaylistsCrud',
   }
   // ./pathDirAbsSrc/output/getYoutubePlaylistsCrud/getYoutubePlaylistsCrud.ts
   // ./pathDirAbsSrc/output/getYoutubePlaylistsCrud/getYoutubePlaylistsCrud.test.ts
   const copiedDirPath = await getDirCopied(getDirCopiedParams, getDirCopiedOptions)
 */

// A string maps every file to the same name (only sensible for a single file);
// a function transforms each file name individually.
const getRenamedFile = (nameFile: string, nameDestFiles?: NameDestFilesType): string => {
  if (nameDestFiles === undefined) return nameFile
  return typeof nameDestFiles === 'function' ? nameDestFiles(nameFile) : nameDestFiles
}

export const getDirCopiedUnsafe: GetDirCopiedType = async (
  { pathDirAbsSrc, pathDirAbsDest },
  options = {},
) => {
  const { overwrite, filter, nameDestDir, nameDestFiles }: GetDirCopiedOptionsType = {
    ...optionsDefault,
    ...options,
  }

  const srcResolved = path.resolve(pathDirAbsSrc)
  const target = path.join(pathDirAbsDest, nameDestDir ?? path.basename(srcResolved))

  // Destination paths written during this run, used to catch rename collisions
  const written = new Set<string>()

  const copyRecursive = async (srcDir: string, destDir: string): Promise<void> => {
    await mkdir(destDir, { recursive: true })
    const entries = await readdir(srcDir, { withFileTypes: true })

    for (const entry of entries) {
      const srcPath = path.join(srcDir, entry.name)
      if (!filter(srcPath)) continue

      if (entry.isDirectory()) {
        // directory names are kept; only files are renamed
        await copyRecursive(srcPath, path.join(destDir, entry.name))
        continue
      }

      const destPath = path.join(destDir, getRenamedFile(entry.name, nameDestFiles))

      if (written.has(destPath)) {
        throw new Error(
          `Rename collision: multiple files map to ${destPath} (last source: ${srcPath})`,
        )
      }
      written.add(destPath)

      if (entry.isSymbolicLink()) {
        // symlink() throws EEXIST even when overwrite is true, so remove first
        if (overwrite) await rm(destPath, { force: true })
        await symlink(await readlink(srcPath), destPath)
      } else {
        await copyFile(srcPath, destPath, overwrite ? 0 : constants.COPYFILE_EXCL)
      }
    }
  }

  if (filter(srcResolved)) {
    await copyRecursive(srcResolved, target)
  }

  return target
}

type GetDirCopiedCaseType = {
  index: number
  description?: string
  params: Parameters<typeof getDirCopied>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getDirCopied>[1]
  expected: ReturnType<typeof getDirCopied>
}

const getDirCopied = withTryCatchFinallyWrapper<
  GetDirCopiedParamsType,
  GetDirCopiedOptionsType,
  GetDirCopiedResType
>(getDirCopiedUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export type {
  GetDirCopiedCaseType,
  GetDirCopiedOptionsType,
  GetDirCopiedParamsType,
  GetDirCopiedResType,
  GetDirCopiedType,
}
export { getDirCopied }
