// import { strictEqual } from 'assert'
// import axios from 'axios'

// const newProduct = {
//   title: "Test Bass",
//   image: "https://i.imgur.com/0W9k3uP.jpeg",
//   price: 7,
// }

// describe("Products CRUD", function () {
//   this.timeout(10000); // aumenta el tiempo de espera a 5000ms solo para esta prueba
//   const baseUrl = 'http://localhost:8080'; // modificar si es necesario

//   it("GET all products", async function () {
//     const res1 = await axios.get(`${baseUrl}/api/productos`)
//     strictEqual(res1.status, 200)
//   });

//   it("Creates a new product", async function () {
//     const { data: beforeData } = await axios.get(`${baseUrl}/api/productos`)
//     const res1 = await axios.post(`${baseUrl}/api/productos`, newProduct);
//     const { data: afterData } = await axios.get(`${baseUrl}/api/productos`)
//     strictEqual(beforeData.length + 1, afterData.length)
//     strictEqual(res1.status, 201)
//   });

//   it("Change a product values", async function () {
//     const { data: beforeData } = await axios.get(`${baseUrl}/api/productos`)
//     const beforeProduct = {
//       ...beforeData[0],
//       title: "producto editado"
//     }
//     const res = await axios.put(`${baseUrl}/api/productos/${beforeProduct.id}`, beforeProduct);
//     const { data: afterData } = await axios.get(`${baseUrl}/api/productos`)
//     const afterProduct = afterData.find(obj => obj.id == beforeProduct.id)
//     strictEqual(beforeProduct.title, afterProduct.title)
//     strictEqual(beforeData.length, afterData.length)
//     strictEqual(res.status, 200)
//   });

//   it("Delete one product", async function () {
//     const { data: beforeData } = await axios.get(`${baseUrl}/api/productos`);
//     const res1 = await axios.delete(`${baseUrl}/api/productos/${beforeData[0].id}`);
//     const { data: afterData } = await axios.get(`${baseUrl}/api/productos`);

//     strictEqual(beforeData.length - 1, afterData.length)
//     strictEqual(res1.status, 200)
//   });
// });

//--------------------

import request from 'supertest';
import { expect, should } from 'chai';

const newProduct = {
  title: "Test Bass",
  image: "https://i.imgur.com/0W9k3uP.jpeg",
  price: 7,
}
let newProductId;

describe("Products CRUD", function () {
  it("GET all products", async () => {
    const response = await request("http://localhost:8080").get('/api/productos')
    const allProducts = await response.body
    expect(response.status).to.eql(200)
    should().not.equal(allProducts, undefined);
  });

  it("Creates a new product", async () => {
    const response = await request("http://localhost:8080").post("/api/productos").send(newProduct)
    newProductId = await response.body.productID;
    expect(response.status).to.eql(201)
    should().not.equal(newProductId, undefined);
  });
  
  it("Change a product values", async () => {
    const newInfo = {
      title: "Test Bass 2",
      image: "test2",
      price: 10101010,
    }
    const response = await request("http://localhost:8080").put(`/api/productos/${newProductId}`).send(newInfo)
    expect(response.status).to.eql(200)
  });

  it("Delete the new product", async () => {
    const response = await request("http://localhost:8080").delete(`/api/productos/${newProductId}`)
    expect(response.status).to.eql(200)
  });
});