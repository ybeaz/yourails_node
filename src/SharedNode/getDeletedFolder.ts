import { withTryCatchFinallyWrapper } from 'yourails_common'

export const getDeletedFolder = (path: string) => {
  if (typeof window !== 'undefined') return

  const fs = require('fs')
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function (file: string, index: number) {
      var curPath = path + '/' + file

      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        getDeletedFolder(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })

    console.log(`deleted ${path} ...`)
    fs.rmdirSync(path)
  }
}
