import express from "express";
import checkAdmin from "./utils/checkAdmin.js";
import router from "./routes/index.js";
import { config } from "dotenv";
//import "./db/db.js"
//import cors from "cors";
//import dbConnect from "./db/db.js";


const app = express()
// dbConnect(app);
const PORT = process.env.PORT || 8080;
config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use(checkAdmin);
app.use(cors({origin:true}))

//Importando Routers
app.use("/api", router);

//Pagina no encontrada
app.use((req, res, next) => {
    res.status(404).json({ error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada` });
});

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`error en el servidor ${error}`))

//export default app;