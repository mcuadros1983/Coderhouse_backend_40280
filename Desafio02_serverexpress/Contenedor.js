const fs = require("fs");

module.exports = class Contenedor {
    constructor(archivo) {
        this.archivo = `./${archivo}.txt`
    }

    async save(title, price, thumbnail) {
        let id = 1
        let newArray = []
        try {
            const array = JSON.parse(await fs.promises.readFile(this.archivo, "utf-8"))
            if (array.length !== 0) {
                id = Math.max(...array.map(x => parseInt(x.id))) + 1
            } else {
                id
            }
            const data = { title, price, thumbnail, id }
            array.push(data)
            const newData = JSON.stringify(array)
            await fs.promises.writeFile(this.archivo, newData)
            return id

        } catch (error) {
            const data = { title, price, thumbnail, id }
            newArray.push(data)
            newArray.toString()
            const stringArray = JSON.stringify(newArray)
            await fs.promises.writeFile(this.archivo, stringArray)
            return id
        }
    }


    async getById(id) {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.archivo, "utf-8"))
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
        try {
            const array = JSON.parse(await fs.promises.readFile(this.archivo, "utf-8"))
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
        try {
            const array = JSON.parse(await fs.promises.readFile(this.archivo, "utf-8"))
            const producto = array.find(product => product.id === id);
            if (producto) {
                let newArray = array.filter((item) => item.id !== id);
                const newData = JSON.stringify(newArray)
                await fs.promises.writeFile(this.archivo, newData)
                console.log("El producto fue eliminado exitosamente")
            } else {
                return null
            }
        } catch (error) {
            return null
        }
    }

    async deleteAll() {
        try {
            const contenido = await fs.promises.readFile(this.archivo, "utf-8")
            const newData = []
            const stringNewData = JSON.stringify(newData)
            await fs.promises.writeFile(this.archivo, stringNewData)


        } catch (error) {
            console.log("No existen datos para eliminar")
        }
    }
}
