const express = require('express');
const ArticleController = require('../controllers/article');

class ArticleRouter {
    constructor() {
        this.router = express.Router();
        this.controller = ArticleController;
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', (req, res) => this.controller.getAllArticles(req, res));
        this.router.get('/create-article', (req, res) => this.controller.showCreateForm(req, res));
        this.router.get('/article/edit/:id', (req, res) => this.controller.showEditForm(req, res));
        this.router.get('/article/delete/:id', (req, res) => this.controller.showDeleteForm(req, res));
        this.router.post('/article/create', (req, res) => this.controller.createNewArticle(req, res));
        this.router.post('/article/edit/:id', (req, res) => this.controller.updateArticle(req, res));
        this.router.delete('/article/delete/:id', (req, res) => this.controller.deleteArticle(req, res));
        this.router.get('/article/:slug', (req, res) => this.controller.getArticleBySlug(req, res));
        this.router.get('/author/:authorId', (req, res) => this.controller.getArticlesByAuthor(req, res));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ArticleRouter().getRouter();