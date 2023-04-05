const admin = require("firebase-admin");
const { config } = require('./config')

const configFirebase = config.FIREBASE_KEY

admin.initializeApp({
  credential: admin.credential.cert(configFirebase),
});

console.log("Conexion exitosa a firebase");
