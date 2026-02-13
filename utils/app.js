const express = require('express')
const sessions = require('express-session')
const articleRoutes = require('../routes/article')
const userRoutes = require('../routes/users')

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
        this.app.use(sessions({
            secret: 'your_secret_key',
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: 24 * 60 * 60 * 1000 }
        }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    initRoutes() {
        this.app.use('/', articleRoutes)
        this.app.use('/', userRoutes)
        this.app.get('/register', (req, res) => {
            res.render('register')
        })
        this.app.get('/login', (req, res) => {
            res.render('login')
        })
        this.app.get('/article/:slug', (req, res) => {
            let query = `SELECT * FROM articles WHERE slug = '${req.params.slug}'`
            let article
            con.query(query, (err, results) => {
                if (err) {
                    res.status(500).render('error', { error: err.message })
                } else if (results.length > 0) {
                    article = results[0]
                    res.render('article', { article: article })
                } else {
                    res.status(404).render('error', { error: 'Article not found' })
                }
            })
        })

        this.app.get('/articles/:slug', (req, res) => {
            res.render('article', { slug: req.params.slug })
        })

    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        })
    }

}

module.exports = App