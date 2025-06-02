export const getReadJsonFile = async (path: string) => {
  if (typeof window !== 'undefined') return

  const { promises: fsa } = await import('fs')

  const data = await fsa.readFile(path, 'utf8')
  return JSON.parse(data)
}
