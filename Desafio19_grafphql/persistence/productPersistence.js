import ProductRepository from'./repository/ProductRepository.js'
const productRepository = new ProductRepository()
import { faker } from '@faker-js/faker'

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

function deleteProduct(id) {
  return productRepository.deleteById(id)
}

function updateProduct(id, newProduct) {
  return productRepository.updateById(id, newProduct)
}

export default {
  getAllProducts,
  addProduct,
  getProductsTest,
  deleteProduct,
  updateProduct
}
