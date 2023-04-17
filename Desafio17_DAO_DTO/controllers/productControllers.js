const productService= require('../business/productService.js')

async function postProduct(req, res) {
  try {
    const { title, price, image } = req.body
    const productID = await productService.addProduct({title, price, image})
    res.json({ productID })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al agregar producto' })
  }
}

async function getProductsTest(req, res) {
  try {
    const products = await productService.getProductsTest()
    res.json(products)
  } catch (error) {
    res.json([])
  }
}

module.exports = {
  postProduct,
  getProductsTest,
}
