import path from 'node:path'

export function withRawSuffix({ pathFileAbsInput }: { pathFileAbsInput: string }) {
  const dir = path.dirname(pathFileAbsInput)
  const ext = path.extname(pathFileAbsInput)
  const base = path.basename(pathFileAbsInput, ext)
  return path.join(dir, `${base}_raw${ext}`)
}
