const path = require('path')  //* working with paths, instead of using strings



const pathObj = path.parse(__filename)
console.log(pathObj.name)
console.log(path.extname(__filename))
console.log(__filename)