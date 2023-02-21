import { config } from "dotenv";
config();

// Archivo
import { ProductosDaoArchivo } from "./productos/ProductosDaoArchivo.js";
import { CarritosDaoArchivo } from "./carritos/CarritosDaoArchivo.js";

// Memoria
import { ProductosDaoMemoria } from "./productos/ProductosDaoMemoria.js";
import { CarritosDaoMemoria } from "./carritos/CarritosDaoMemoria.js";

// Firebase
import { connectFirebase } from "../db/firebaseConnect.js";
import { ProductosDaoFirebase } from "./productos/ProductosDaoFirebase.js";
import { CarritosDaoFirebase } from "./carritos/CarritosDaoFirebase.js";

// MongoDb
import { connectMongo } from "../db/mongoConnect.js";
import { ProductosDaoMongoDb } from "./productos/ProductosDaoMongoDb.js";
import { CarritosDaoMongoDb } from "./carritos/CarritosDaoMongoDb.js"


let productosDao;
let carritosDao;

const PERS = process.env.PERS || "archivo";

switch (PERS) {
  case "archivo":
    productosDao = new ProductosDaoArchivo();
    carritosDao = new CarritosDaoArchivo();
    break;

  case "memoria":
    productosDao = new ProductosDaoMemoria();
    carritosDao = new CarritosDaoMemoria();
    break;

  case "firebase":
    //connectFirebase()
    productosDao = new ProductosDaoFirebase();
    carritosDao = new CarritosDaoFirebase();
    break;

  case "mongoDb":
    connectMongo();
    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDb();
    break;

  //}
  // productosDao = ProductosDaoMongoDb.getInstance();

  // break;
}

export { productosDao, carritosDao };
//export { productosDao };