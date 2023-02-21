const express = require('express');
const Contenedor = require("./Contenedor")

const app = express();
const PORT = 8080
const productos = new Contenedor("productos")


const main = async () => {
    try {
        const archivoNuevo = new Contenedor("productos");
        console.log(archivoNuevo);
        await archivoNuevo.save("cpu", 100, "www.google.com");
        await archivoNuevo.save("monitor", 200, "www.yahoo.com");
        await archivoNuevo.save("teclado", 300, "www.google.com");
    } catch (error) {
        console.log(error)
    }
}

main()


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/productos', (req, res) => {
    productos
        .getAll()
        .then((data) => res.send(data))
        .catch((error) => {
            console.log(error);
            res.send({ error: error.message })
        })
})

app.get('/productosRandom', (req, res) => {
    const array = productos.getAll()
        .then((data) => res.send(data[Math.floor(Math.random() * data.length)]))
        .catch((error) => {
                console.log(error);
                res.send({error:error.message})
            })
        })
