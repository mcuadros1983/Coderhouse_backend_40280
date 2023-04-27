import { buildSchema } from "graphql";
// import productService from '../business/productService.js'
import productService from "../business/productService.js";

const schema = buildSchema(`
  type Product {
    id: ID!
    title: String,
    price: Float,
    image: String,
  }
  input ProductInput {
    title: String,
    price: Float,
    image: String,
  }
  type Query {
    getProducts: [Product],
  }
  type Mutation {
    addProduct(datos: ProductInput): Product, 
    updateProduct(id: ID!, datos: ProductInput): Product,
    deleteProduct(id: ID!): Product
  }
`);

async function getProducts() {
  try {
    const products = await productService.getProducts();
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addProduct({ datos }) {
  try {
    const product = await productService.addProduct(datos);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteProduct({ id }) {
  try {
    const product = await productService.deleteProduct(id);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateProduct({ id, datos }) {
  try {
    const idProduct = id
    const { title, price, image } = datos;
    const newProduct = { title, price, image };
    const product = await productService.updateProduct(idProduct, newProduct);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

const config = {
  schema: schema,
  rootValue: {
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct,
  },
  graphiql: true,
};

export default config;
