import admin from "firebase-admin";
import formatDTO from "../../dto/ProductDTO.js";

class ProductdDaoFirebase {
  constructor() {
    const db = admin.firestore();
    this.query = db.collection("products");
  }

  init() {
    console.log("product dao in Firebase -> ready!");
  }

  async disconnect() {
    try {
      console.log("product dao in Firebase -> closed!");
    } catch (error) {
      console.error(error);
    }
  }

  async getById(id) {
    try {
      const docRef = this.query.doc(id);
      if (!docRef) {
        throw new Error(error);
      }
      const document = await docRef.get();
      const data = document.data();
      return formatDTO(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const docRef = await this.query.get();
      const documents = docRef.docs;
      const data = documents.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      return formatDTO(data);
    } catch (error) {
      throw new Error(error);
    }
  }
  async save(obj) {
    try {
      const res = await this.query.add(obj)
      const res2 = await this.query.doc(res.id).get()
      const res3 = res2.data()
      const object = {
        id:res.id,
        price:res3.price,
        image:res3.image,
        title:res3.title
      }
      console.log(object)
      return object
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateById(id, obj) {
    try {
      const docRef = this.query.doc(id);
      if (!docRef) {
        throw new Error("No se encuentra esa id");
      }
      return await docRef.update(obj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteById(id) {
    try {
      const docRef = this.query.doc(id);
      return await docRef.delete();
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ProductdDaoFirebase;
