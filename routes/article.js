const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/article');

router.get('/',(req, res) => ArticleController.getAllArticles(req, res));
router.get('/article/:slug', (req, res) => ArticleController.getArticleBySlug(req, res));
router.post('/article/create', (req, res) => ArticleController.createNewArticle(req, res));
router.get('/author/:authorId', (req, res) => ArticleController.getArticlesByAuthor(req, res));

class ArticleRouter {
    constructor() {
        this.router = express.Router();
        this.controller = ArticleController;

        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/author/:authorId', (req, res) => this.controller.getArticlesByAuthor(req, res));
        this.router.get('/article/:slug', this.controller.getArticleBySlug);
        this.router.post('/article', this.controller.createArticle);
        this.router.get('/', this.controller.getAllArticles);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ArticleRouter().getRouter();