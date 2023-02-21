const express = require("express")
const app = express()
const Contenedor = require("./Contenedor")
const producto = new Contenedor("producto")

app.set("views", "./views") //declarar extension y ubicacion
app.set("view engine", "ejs") //declarar el motor y extension
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render('formProductos')//se renderiza el archivo base de estructura mas los datos de la constante
})

app.post("/productos", (req, res) => {
    producto
        .save(req.body)
        .then(() => res.redirect("/"))
        .catch((error) => {
            res.send({ error: error.message })
        })
})

app.get('/productos', (req, res) => {
    producto
        .getAll()
        .then((data) => res.render('tablaProductos', { data }))
        .catch((error) => {
            res.send({ error: error.message })
        })
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})
server.on("error", error => `Error en el puerto ${error}`)