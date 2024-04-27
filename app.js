const logger = require('./logger')
logger.on('messageLogged', (args) => {
  console.log("event called", args)
} )

logger.log('message')