const ProductRepository = require('./repository/ProductRepository.js')
const productRepository = new ProductRepository()
const { faker } = require('@faker-js/faker')

function getAllProducts() {
  return productRepository.getAll()
}

function addProduct({ title, price, image }) {
  const newProduct = { title, price, image }
  return productRepository.save(newProduct)
}

function getProductsTest(num) {
  const products = []

  for (let i = 1; i <= num; i++) {
    products.push({
      id: i,
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.business(),
    })
  }

  return products
}

module.exports = {
  getAllProducts,
  addProduct,
  getProductsTest,
}
