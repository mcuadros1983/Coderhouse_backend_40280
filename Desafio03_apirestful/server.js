const express = require("express")
const { Router } = express
const app = express()
const router = Router()
const Contenedor = require("./Contenedor")
const productos = new Contenedor("productos")

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    productos
        .getAll()
        .then((data) => res.send(data))
        .catch((error) => {
            res.send({ error: error.message })
        })
})

router.get('/:id', (req, res) => {
    let id = parseInt(req.params.id)
    productos
        .getById(id)
        .then((data) => res.send(data))
        .catch((error) => {
            res.send({ error: error.message })
        })
})

router.post('/', (req, res) => {
    productos
        .save(req.body)
        .then((data) => res.send(data))
        .catch((error) => {
            res.send({ error: error.message })
        })
})

router.put('/:id', (req, res) => {
    let { id } = req.params
    let newObject = req.body
    productos
        .updateById(id, newObject)
        .then((data) => res.send(data))
        .catch((error) => {
            res.send({ error: error.message })
        })
})

router.delete('/:id', (req, res) => {
    let id = parseInt(req.params.id)
    productos
        .deleteById(id)
        .then((data) => res.send(data))
        .catch((error) => {
            res.send({ error: error.message })
        })
})

app.use('/api/productos', router)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`error en el servidor ${error}`))