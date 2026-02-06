const express = require('express')
const articleRoutes = require('../routes/article')

class App {
    constructor(port) {
        this.port = port
        this.app = express()
        this.initMiddleware()
        this.initRoutes()
        this.start()
        this.bindMethods()
    }

    bindMethods() {
        this.initMiddleware = this.initMiddleware.bind(this)
        this.initRoutes = this.initRoutes.bind(this)
        this.start = this.start.bind(this)
    }

    initMiddleware() {
        this.app.use(express.json())
    }

    initRoutes() {
        this.app.use('/', articleRoutes)
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        })
    }
}

module.exports = App