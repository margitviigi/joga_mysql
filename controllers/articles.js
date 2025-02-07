const db = require('../utils/db')

const getAllArticles = (req, res) => {
    let sql = 'SELECT * FROM article'
    db.query(sql, (error, result)  => {
        res.render('index', {
            articles: result
        } )
    } )
} 

const getArticleBySlug = (req, res) => {
    let sql = `SELECT * FROM article WHERE slug="${req.params.slug}"`
    db.query(sql, (error, result)  => {
        console.log(result)
    } )
} 

module.exports = {
    getAllArticles,
    getArticleBySlug
} 