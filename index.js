const functionName = process.argv[2]
const fs = require('fs')

fs.writeFileSync(`./${functionName}.js`, `function ${functionName}(){}`)
console.log(`function ${functionName}() {}
`)
