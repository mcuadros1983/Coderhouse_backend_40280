import admin from "firebase-admin";

class Contenedor {
  constructor(coll) {
    const db = admin.firestore();
    this.query = db.collection(coll);
  }
  async getById(id) {
    try {
      const docRef = this.query.doc(id);
      if (!docRef) {
        throw new Error(error)
      }
      const document = await docRef.get();
      return document.data();
    } catch (error) {
      throw new Error(error)
    }
  }
  async getAll() {
    try {
      const docRef = await this.query.get();
      const documents = docRef.docs;
      return documents.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
    } catch (error) {
      throw new Error(error)
    }
  }
  async save(obj) {
    try {
      const docRef = this.query.doc();
      return await docRef.set(obj);
    } catch (error) {
      throw new Error(error)
    }
  }
  async updateById(id, obj) {
    try {
      const docRef = await this.query.doc(id).update(obj);
      // if (!docRef) {
      //   throw new Error("No se encuentra esa id");
      // }
      return docRef
    } catch (error) {
      throw new Error(error)
    }
  }
  async deleteById(id) {
    try {
      const docRef = this.query.doc(id);
      return await docRef.delete();
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default Contenedor;
