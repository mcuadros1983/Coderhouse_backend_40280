const logger = require("../logger.js")
const loggerConsola = logger.getLogger("default");
const productPersistence = require('../persistence/productPersistence.js')


async function addProduct({title, price, image}) {
  try {
    const isError = validateProduct({title, price, image})
    if(isError) throw new Error(isError)
    
    const res = productPersistence.addProduct({ title, price, image })
    loggerConsola.info(`Registro de producto exitosa`)
    return res;
  } catch (error) {
    loggerConsola.error('Error en postProduct: ' + error.message)
    return error
  }
}


async function getProductsTest() {
  return productPersistence.getProductsTest(5);
}


function validateProduct({title, price, image}) {
  if (!title || !price || !image || !title.trim() || !image.trim()) {
    return 'faltan datos del producto'
  } else if (isNaN(price)) {
    return 'El precio debe ser de tipo numérico'
  } else if (!image.includes('http')) {
    return 'La URL de la foto debe iniciar con http'
  }
  return false
}


module.exports = {
  addProduct,
  getProductsTest,
}