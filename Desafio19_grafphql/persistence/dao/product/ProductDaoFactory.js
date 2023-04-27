import ProductDaoFirebase from './ProductDaoFirebase.js'
import parseArgs from 'minimist'
import argsConfig from '../../../argsConfig.js'
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

export default class ProductDaoFactory {
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
