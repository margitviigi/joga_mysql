const ArticleModel = require('../models/article');

class ArticleController {

    constructor() {
        this.model = ArticleModel;
        this.getAllArticles = this.getAllArticles.bind(this);
        this.getArticleBySlug = this.getArticleBySlug.bind(this);
        this.createNewArticle = this.createNewArticle.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.getArticlesByAuthor = this.getArticlesByAuthor.bind(this);
        this.showCreateForm = this.showCreateForm.bind(this);
        this.showEditForm = this.showEditForm.bind(this);
        this.showDeleteForm = this.showDeleteForm.bind(this);
    }

    async getAllArticles(req, res) {
        try {
            const articles = await this.model.findAll();
            res.render('index', { articles: articles });
        } catch (error) {
            res.status(500).render('error', { error: error.message });
        }
    }

    async getArticleBySlug(req, res) {
        try {
            const article = await this.model.findOne(req.params.slug);
            if (article) {
                res.render('article', { article: article });
            } else {
                res.status(404).render('error', { error: 'Article not found' });
            }
        } catch (error) {
            res.status(500).render('error', { error: error.message });
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

    async updateArticle(req, res) {
        try {
            const articleId = req.params.id;
            const updatedData = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                published: new Date().toISOString().slice(0, 19).replace('T', ' '),
                author_id: req.body.author_id
            }
            const affectedRows = await this.model.update(articleId, updatedData);
            if (affectedRows > 0) {
                res.redirect('/');
            } else {
                res.status(404).render('error', { error: 'Article not found' });
            }
        } catch (error) {
            res.status(500).render('error', { error: error.message });
        }
    }

    async deleteArticle(req, res) {
        try {
            const articleId = req.params.id;
            const affectedRows = await this.model.delete(articleId);
            if (affectedRows > 0) {
                res.redirect('/');
            } else {
                res.status(404).render('error', { error: 'Article not found' });
            }
        } catch (error) {
            res.status(500).render('error', { error: error.message });
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
        try {
            const newArticle = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                published: new Date().toISOString().slice(0, 19).replace('T', ' '),
                author_id: req.body.author_id
            }
            const articleId = await this.model.create(newArticle)
            res.redirect('/');
        } catch (error) {
            res.status(500).render('error', { error: error.message });
        }
    }

    showCreateForm(req, res) {
        res.render('article-form');
    }

    async showEditForm(req, res) {
        try {
            const article = await this.model.findById(req.params.id);
            if (article) {
                res.render('article-form', { article: article });
            } else {
                res.status(404).render('error', { error: 'Article not found' });
            }
        } catch (error) {
            res.status(500).render('error', { error: error.message });
        }
    }

    async showDeleteForm(req, res) {
        try {
            const article = await this.model.findById(req.params.id);
            if (article) {
                res.render('article-delete', { article: article });
            } else {
                res.status(404).render('error', { error: 'Article not found' });
            }
        } catch (error) {
            res.status(500).render('error', { error: error.message });
        }
    }

}

module.exports = new ArticleController();