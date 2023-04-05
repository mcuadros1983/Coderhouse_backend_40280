// import { config } from "dotenv";
// config();

//Archivo
import { ProductosDaoArchivo } from "./productos/ProductosDaoArchivo.js";
import { CarritosDaoArchivo } from "./carritos/CarritosDaoArchivo.js";

// Memoria
//import { ProductosDaoMemoria } from "./productos/ProductosDaoMemoria.js";
//import { CarritosDaoMemoria } from "./carritos/CarritosDaoMemoria.js";

// Firebase
//import { connectFirebase } from "../db/firebaseConnect.js";
//import { ProductosDaoFirebase } from "./productos/ProductosDaoFirebase.js";
//import { CarritosDaoFirebase } from "./carritos/CarritosDaoFirebase.js";

// MongoDb
import { connectMongo } from "../db2/mongoConnect.js";
// import { ProductosDaoMongoDb } from "./productos/ProductosDaoMongoDb.js";
// import { CarritosDaoMongoDb } from "./carritos/CarritosDaoMongoDb.js";

let productosDao;
let carritosDao;

const PERS = process.env.PERS || "archivo";

switch (PERS) {
  case "archivo":
    const { default: ProductosDaoArchivo } = await import("./productos/ProductosDaoArchivo.js");
    const { default: CarritosDaoArchivo } = await import("./carritos/CarritosDaoArchivo.js");

    productosDao = new ProductosDaoArchivo();
    carritosDao = new CarritosDaoArchivo();
    break;

  case "memoria":
    const { default: ProductosDaoMemoria } = await import("./productos/ProductosDaoMemoria.js");
    const { default: CarritosDaoMemoria} = await import("./carritos/CarritosDaoMemoria.js");
    
    productosDao = new ProductosDaoMemoria();
    carritosDao = new CarritosDaoMemoria();
    break;

  case "firebase":
    const { default: ProductosDaoFirebase } = await import("./productos/ProductosDaoFirebase.js");
    const { default: CarritosDaoFirebase} = await import("./carritos/CarritosDaoFirebase.js");
    
    productosDao = new ProductosDaoFirebase();
    carritosDao = new CarritosDaoFirebase();
    break;

  case "mongoDb":
    connectMongo();
    const { default: ProductosDaoMongoDb} = await import("./productos/ProductosDaoMongoDb.js");
    const { default: CarritosDaoMongoDb} = await import("./carritos/CarritosDaoMongoDb.js");
    
    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDb();
    break;

  //}
  // productosDao = ProductosDaoMongoDb.getInstance();

  // break;
}

export { productosDao, carritosDao };
//export { productosDao };
