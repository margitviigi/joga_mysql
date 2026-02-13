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
        this.router.get('/article/:slug', (req, res) => this.controller.getArticleBySlug(req, res));
        this.router.post('/article/create', (req, res) => this.controller.createNewArticle(req, res));
        this.router.patch('/article/edit/:id', (req, res) => this.controller.updateArticle(req, res));
        this.router.get('/author/:authorId', (req, res) => this.controller.getArticlesByAuthor(req, res));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ArticleRouter().getRouter();