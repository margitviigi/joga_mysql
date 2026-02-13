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
  async update(id, updatedData) {
    const affectedRows = await super.update(id, updatedData);
    return affectedRows;
  }
  async delete(id) {
    const affectedRows = await super.delete(id);
    return affectedRows;
  }
}

module.exports = new ArticleModel();