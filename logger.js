const EventEmitter = require('events')

class Logger extends EventEmitter {
    // sends HTTP request
    log(message) {
        console.log(message)

        this.emit('messageLogged', {id: 1, url: 'https://'})
    }
}

module.exports = new Logger();