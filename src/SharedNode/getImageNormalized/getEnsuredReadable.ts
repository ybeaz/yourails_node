import { access } from 'node:fs/promises'
import { constants } from 'node:fs'

export async function getEnsuredReadable({ pathFileAbsInput }: { pathFileAbsInput: string }) {
  await access(pathFileAbsInput, constants.R_OK)
}
