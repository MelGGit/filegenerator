const fs = require('fs')

function writeFile(name, fileType, fileString) {
  fs.writeFileSync(`./${name}${fileType}.js`, fileString)
}

module.exports = writeFile
