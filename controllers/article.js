const article = require('../models/article');
const ArticleModel = require('../models/article');

class ArticleController {

    constructor() {
        this.model = ArticleModel;
        this.getAllArticles = this.getAllArticles.bind(this);
        this.getArticleBySlug = this.getArticleBySlug.bind(this);
        this.createArticle = this.createArticle.bind(this);
        this.getArticlesByAuthor = this.getArticlesByAuthor.bind(this);
    }

    async getAllArticles(req, res) {
        try {
            const articles = await this.model.findAll();
            res.status(201).json({articles: articles});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getArticleBySlug(req, res) {
        try {
            const article = await this.model.findOne(req.params.slug);
            if (article) {
                res.status(201).json({ article: article });
            } else {
                res.status(404).json({ error: 'Article not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createArticle(req, res) { 
        try {
            const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
            }
            const articleId = await this.model.create(newArticle);
            res.status(201).json({ id: articleId, ...newArticle });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getArticlesByAuthor(req, res) {
        try {
            const authorId = req.params.authorId;
            const articles = await this.model.findByAuthorId(authorId);
            res.status(200).json({ author_id: authorId, articles: articles });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createNewArticle(req, res) {
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        }
        const articleId = await article.create(newArticle)
        res.status(201).json({ 
            message: `created new article with id ${articleId}`,
            article: { id: articleId, ...newArticle }
        });
    }

}

module.exports = new ArticleController();