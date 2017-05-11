import fs from 'fs'
import ejs from 'ejs'
import mkdirp from 'mkdirp'
import path from 'path'

import {
  getFileName,
  getFilePath,
  extractModuleInfo
} from './utils'

const templatePath = path.resolve(__dirname, '..', 'templates/program.ejs')

export default (cli) => {
  const { input, flags } = cli

  const moduleName = input[1]

  const filePath = getFilePath(moduleName)
  const fileName = getFileName(moduleName)
  const imports = flags.import.map(extractModuleInfo)

  mkdirp(filePath, function(err) {
    if (!err) {
      ejs.renderFile(templatePath, { moduleName, imports }, (err, data) => {
        if (!err) fs.writeFile(filePath + fileName, data)
      })
    }
  })
}
