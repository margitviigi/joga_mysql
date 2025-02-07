const app = require('./utils/app')
const db = require('./utils/db')
const articleRoutes = require('./routes/articles')

app.use('/', articleRoutes)
app.use('/article', articleRoutes)

app.listen(3012, () => {
    console.log('Web server is connected.')
} )