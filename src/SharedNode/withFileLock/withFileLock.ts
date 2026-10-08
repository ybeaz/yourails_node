import lockfile from 'proper-lockfile'

export async function withFileLock<T>(pathFileAbs: string, fn: () => Promise<T>): Promise<T> {
  const release = await lockfile.lock(pathFileAbs, { retries: 5 })
  try {
    return await fn()
  } finally {
    await release()
  }
}
