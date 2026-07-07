export const getDeletedFile = (pathFileAbs: string) => {
  if (typeof window !== 'undefined') return

  const fs = require('fs')

  fs.unlinkSync(pathFileAbs)
}
