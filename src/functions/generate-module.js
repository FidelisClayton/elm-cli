const fs = require("fs")
const ejs = require("ejs")
const mkdirp = require("mkdirp")
const path = require("path")

module.exports = flags => {
  const pathParts = flags.module.split(".")
  const lastIndex = pathParts.length - 1

  const filePath =
    pathParts > 1
      ? pathParts.slice(0, lastIndex).join("/") + "/"
      : "./"

  const imports = flags.import.map(module => {
    const moduleName = module.split("[")[0]
    const exposing =
      module
        .split("[")
        .pop()
        .split("]")
        .shift()
        .split(",")

    if (exposing.length > 1) {
      return { name: moduleName, exposing }
    }

    return { name: moduleName, exposing: [] }
  })

  const fileName = pathParts[lastIndex] + ".elm"

  mkdirp(filePath, function(err) {
    if (!err) {
      ejs.renderFile(path.resolve(__dirname, '..', 'templates/view.ejs'), { moduleName: flags.module, imports: imports }, (err, data) => {
        if (!err) fs.writeFile(filePath + fileName, data)
      })
    }
  })
}
