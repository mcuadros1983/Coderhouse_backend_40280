import logger from "../logger.js";
const loggerConsola = logger.getLogger("default");
import productPersistence from "../persistence/productPersistence.js";


async function addProduct({title, price, image}) {
  try {
    const isError = validateProduct({title, price, image})
    if(isError) throw new Error(isError)
    
    const res = await productPersistence.addProduct({ title, price, image })
    loggerConsola.info(`Registro de producto exitosa`)
    return res;
  } catch (error) {
    loggerConsola.error('Error en postProduct: ' + error.message)
    return error
  }
}


async function getProductsTest() {
  return await productPersistence.getProductsTest(5);
}

async function getProducts() {
  return await productPersistence.getAllProducts();
}

async function deleteProduct(id){
  return productPersistence.deleteProduct(id);
}

async function updateProduct(id, newProduct){
  return productPersistence.updateProduct(id, newProduct);
}

function validateProduct({title, price, image}) {
  if (!title || !price || !image) {
    return 'faltan datos del producto'
  } else if (isNaN(price)) {
    return 'El precio debe ser de tipo numérico'
  } else if (!image.includes('http')) {
    return 'La URL de la foto debe iniciar con http'
  }
  return false
}


export default {
  addProduct,
  getProductsTest,
  getProducts,
  deleteProduct,
  updateProduct
}