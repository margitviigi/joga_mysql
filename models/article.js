const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
  constructor() {
    super('article');
  }
  async findOne(slug) {
    const article = await super.findOne('slug', slug);
    return article;
  }
  async findByAuthorId(authorId) {
    return await super.findMany('author_id', authorId);
  }
  async findMany(author) {
    const articles = await super.findMany('author_id', author.id);
    return articles;
  }
  async create(article) {
    const createdArticleId = await super.create(article);
    return createdArticleId;
  }
}

module.exports = new ArticleModel();