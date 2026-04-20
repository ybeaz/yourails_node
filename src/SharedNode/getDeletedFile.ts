export const getDeletedFile = (path: string) => {
  if (typeof window !== 'undefined') return

  const fs = require('fs')

  fs.unlinkSync(path)
}
