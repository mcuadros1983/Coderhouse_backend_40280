// const express = require("express")
const Contenedor = require("./Contenedor.js")


const main = async () => {
    const archivoNuevo = new Contenedor("productos");
    console.log(archivoNuevo);
    await archivoNuevo.save("cpu", 100, "www.google.com");
    await archivoNuevo.save("monitor", 200, "www.yahoo.com");
    await archivoNuevo.save("teclado", 300, "www.google.com");
}

main()