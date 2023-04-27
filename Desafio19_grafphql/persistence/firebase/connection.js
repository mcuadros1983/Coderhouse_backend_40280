// import admin from "firebase-admin";
// // import { config } from './config.js'

// const configFirebase = JSON.parse(process.env.FIREBASE) 

// admin.initializeApp({
//   credential: admin.credential.cert(configFirebase),
// });

// console.log("Conexion exitosa a firebase");

import admin from 'firebase-admin'

const serviceAccount = JSON.parse(process.env.FIREBASE || "")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

console.log('Connection to Firebase successful')