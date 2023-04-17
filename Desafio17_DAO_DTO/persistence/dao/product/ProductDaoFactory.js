const ProductDaoFirebase = require('./ProductDaoFirebase.js')
const parseArgs = require('minimist')
const argsConfig = require('../../../argsConfig.js')
const { DAO_PRODUCT } = parseArgs(process.argv.slice(2), argsConfig.config)

const option = DAO_PRODUCT

let dao
switch (option) {
  case 'Firebase':
    dao = new ProductDaoFirebase()
    dao.init()
    break
  default:
    dao = new ProductDaoFirebase()
    dao.init()
}

module.exports = class ProductDaoFactory {
  static instance

  constructor() {
    if (!ProductDaoFactory.instance) {
        ProductDaoFactory.instance = this;
    } else {
      return ProductDaoFactory.instance;
    }
  }

  getDao() {
    return dao
  }
}
