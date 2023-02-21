const fs = require("fs");

module.exports = class Contenedor {
    constructor(archivo) {
        this.archivo = `./${archivo}.txt`
    }

    async save(title, price, thumbnail) {
        let id = 1
        const nombreArchivo = this.archivo
        let newArray = []
        try {
            const contenido = await fs.promises.readFile(nombreArchivo, "utf-8")
            const array = JSON.parse(contenido)
            if (array.length !== 0) {
                id = Math.max(...array.map(x => parseInt(x.id))) + 1
            } else {
                id
            }
            const data = { title, price, thumbnail, id }
            array.push(data)
            const newData = JSON.stringify(array)
            await fs.promises.writeFile(nombreArchivo, newData)
            return id

        } catch (error) {
            const data = { title, price, thumbnail, id }
            newArray.push(data)
            newArray.toString()
            const stringArray = JSON.stringify(newArray)
            await fs.promises.writeFile(nombreArchivo, stringArray)
            return id
        }
    }


    async getById(id) {
        const nombreArchivo = this.archivo
        try {
            const contenido = await fs.promises.readFile(nombreArchivo, "utf-8")
            const array = JSON.parse(contenido)
            const producto = array.find(product => product.id === id);
            if (producto) {
                return producto
            } else {
                return null
            }

        } catch (error) {
            return null
        }
    }

    async getAll() {
        const nombreArchivo = this.archivo
        try {
            const contenido = await fs.promises.readFile(nombreArchivo, "utf-8")
            const array = JSON.parse(contenido)
            if (array.length < 1) {
                console.log("No existen elementos para mostrar")
            } else {
                return array;
            }
        } catch (error) {
            return []
        }
    }

    async deleteById(id) {
        const nombreArchivo = this.archivo
        try {
            const contenido = await fs.promises.readFile(nombreArchivo, "utf-8")
            const array = JSON.parse(contenido)
            const producto = array.find(product => product.id === id);
            if (producto) {
                let newArray = array.filter((item) => item.id !== id);
                const newData = JSON.stringify(newArray)
                await fs.promises.writeFile(nombreArchivo, newData)
                console.log("El producto fue eliminado exitosamente")
            } else {
                return null
            }
        } catch (error) {
            return null
        }
    }

    async deleteAll() {
        const nombreArchivo = this.archivo
        try {
            const contenido = await fs.promises.readFile(nombreArchivo, "utf-8")
            const newData = []
            const stringNewData = JSON.stringify(newData)
            await fs.promises.writeFile(nombreArchivo, stringNewData)
        

        } catch (error) {
            console.log("No existen datos para eliminar")
        }
    }
}

