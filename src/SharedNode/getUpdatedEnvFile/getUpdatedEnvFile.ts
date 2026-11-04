import { promises as fs } from 'node:fs'
import dotenv from 'dotenv'
import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           export const getUpdatedEnvFileCases: GetUpdatedEnvFileCaseType[] = [
             {
               index: 0,
               description: 'basic test getValidatedEntityLinksFilesReadable',
               params: {},
               options: {},
               expected: '',
             },
           ]
 */

type GetUpdatedEnvFileParamsType = {
  pathFileAbs: string
  updates: Record<string, boolean | string | number>
}

type GetUpdatedEnvFileOptionsType = { funcParent?: string }

type GetUpdatedEnvFileResType = Record<string, string>

type GetUpdatedEnvFileType = (
  params: GetUpdatedEnvFileParamsType,
  options?: GetUpdatedEnvFileOptionsType,
) => Promise<GetUpdatedEnvFileResType>

const optionsDefault = {
  funcParent: 'getUpdatedEnvFile',
} satisfies Required<GetUpdatedEnvFileOptionsType>

const resDefault: GetUpdatedEnvFileResType = {}

const KEY_REGEX = /^[A-Za-z_][A-Za-z0-9_]*$/
const LINE_REGEX = /^(\s*(?:export\s+)?)([A-Za-z_][A-Za-z0-9_]*)\s*=/

const formatValue = (value: boolean | string | number): string => {
  const str = String(value)

  if (/^[\w@%+:,./-]+$/.test(str)) return str

  const hasLineBreak = /[\r\n]/.test(str)
  const hasEscapeLike = /\\[nr]/.test(str) // literal \n or \r, which dotenv would expand in "..."

  if (hasLineBreak && hasEscapeLike) throw new Error('Value cannot be represented in a .env file')

  const text = hasLineBreak ? str.replace(/\r/g, '\\r').replace(/\n/g, '\\n') : str
  // dotenv only expands \n / \r inside double quotes
  const quotes = hasLineBreak ? ['"'] : hasEscapeLike ? ["'", '`'] : ['"', "'", '`']
  const quote = quotes.find((q) => !text.includes(q))

  if (!quote) throw new Error('Value cannot be represented in a .env file')

  return `${quote}${text}${quote}`
}

/**
 * @description Function to getUpdatedEnvFile
 * @usage
   import { getUpdatedEnvFile, GetUpdatedEnvFileParamsType, GetUpdatedEnvFileOptionsType, GetUpdatedEnvFileResType } from '../getUpdatedEnvFile/getUpdatedEnvFile'
   const getUpdatedEnvFileParams: GetUpdatedEnvFileParamsType = {
      pathFileAbs: '.env.development',
      updates: {
        APP_IP: '127.0.0.2',
        APP_PORT: 4001,
      },
   }
   const getUpdatedEnvFileOptions: GetUpdatedEnvFileOptionsType = {}
   getUpdatedEnvFile(getUpdatedEnvFileParams, getUpdatedEnvFileOptions)
*/
const getUpdatedEnvFileUnsafe: GetUpdatedEnvFileType = async (
  { pathFileAbs, updates },
  options = {},
) => {
  const { funcParent } = { ...optionsDefault, ...options } // use for error context/logging

  for (const key of Object.keys(updates)) {
    if (!KEY_REGEX.test(key)) throw new Error(`${funcParent}: invalid env key "${key}"`)
  }

  const realPath = await fs.realpath(pathFileAbs) // keep symlinks intact
  const [content, stat] = await Promise.all([fs.readFile(realPath, 'utf8'), fs.stat(realPath)])

  const newline = content.includes('\r\n') ? '\r\n' : '\n'
  const lines = content.split(/\r?\n/)
  const hadTrailingNewline = lines.length > 1 && lines[lines.length - 1] === ''
  if (hadTrailingNewline || content === '') lines.pop()

  const updatedKeys = new Set<string>()

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(LINE_REGEX)

    if (!match || !Object.hasOwn(updates, match[2])) continue

    const [, prefix, key] = match

    if (updatedKeys.has(key)) {
      lines.splice(i, 1)
      i--
      continue
    }

    lines[i] = `${prefix}${key}=${formatValue(updates[key])}`
    updatedKeys.add(key)
  }

  for (const [key, value] of Object.entries(updates)) {
    if (!updatedKeys.has(key)) lines.push(`${key}=${formatValue(value)}`)
  }

  const result = lines.join(newline) + (lines.length > 0 ? newline : '')
  const tempPath = `${realPath}.${process.pid}.${Date.now()}.tmp`

  try {
    await fs.writeFile(tempPath, result, { encoding: 'utf8', mode: stat.mode })
    await fs.rename(tempPath, realPath)
  } catch (error) {
    await fs.rm(tempPath, { force: true })
    throw error
  }

  return dotenv.parse(result)
}

type GetUpdatedEnvFileCaseType = {
  index: number
  description?: string
  fileContent: string | null // null = the file does not exist
  params: Omit<GetUpdatedEnvFileParamsType, 'pathFileAbs'>
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getUpdatedEnvFile>[1]
  expected?: ReturnType<typeof getUpdatedEnvFile>
  expectedFileContent?: string // exact bytes written
  expectedError?: string | RegExp
}

const getUpdatedEnvFile = withTryCatchFinallyWrapper<
  GetUpdatedEnvFileParamsType,
  GetUpdatedEnvFileOptionsType,
  GetUpdatedEnvFileResType
>(getUpdatedEnvFileUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export type {
  GetUpdatedEnvFileCaseType,
  GetUpdatedEnvFileOptionsType,
  GetUpdatedEnvFileParamsType,
  GetUpdatedEnvFileResType,
  GetUpdatedEnvFileType,
}
export { getUpdatedEnvFile }
