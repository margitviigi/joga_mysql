const BaseSQLModel = require('./base');

class UserModel extends BaseSQLModel {
  constructor() {
    super('user');
  }

  async findById(id) {
    const user = await super.findById(id);
    return user;
  }

  async findByEmail(email) {
    return await super.findOne('email', email);
  }

  async findByUsername(username) {
    return await super.findOne('username', username);
  }

  async create(user) {
    const createdUserId = await super.create(user);
    return createdUserId;
  }

  async updateRole(userId, role) {
    return await super.update(userId, { role: role });
  }
}

module.exports = new UserModel();
