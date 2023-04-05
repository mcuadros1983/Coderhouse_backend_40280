const FirebaseContainer = require('./firebase/Contenedor.js')
const DB = new FirebaseContainer('products')
const { faker } = require('@faker-js/faker')

function getAllProducts() {
  return DB.getAll()
}

function addProduct({ title, price, thumbnail }) {
  const newProduct = { title, price, thumbnail }
  return DB.save(newProduct)
}

function getProductsTest(num) {
  const products = []

  for (let i = 1; i <= num; i++) {
    products.push({
      id: i,
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.business(),
    })
  }

  return products
}

module.exports = {
  getAllProducts,
  addProduct,
  getProductsTest,
}
