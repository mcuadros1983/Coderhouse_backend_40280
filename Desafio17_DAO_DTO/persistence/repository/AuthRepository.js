const AuthDaoFactory = require('../dao/auth/AuthDaoFactory.js')
const authDaoFactory = new AuthDaoFactory()

module.exports = class AuthRepository {
    constructor() {
        this.dao = authDaoFactory.getDao()
    }

    async getAll() {
      return this.dao.getAll()
    }

    async getById(id) {
      return this.dao.getById(id)
    }

    async save(obj) {
      return this.dao.save(obj)
    } 

    async deleteById(id) {
      return this.dao.deleteById(id)
    }
}