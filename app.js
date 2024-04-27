const fs = require('fs');

//* console.log(fs.readdirSync('./'))

fs.readdir('./', (err, result) => {
    err && console.log(err)

    console.log(result)
})