import fs from "fs";

class ContenedorArchivo {
    constructor(archivo) {
        this.archivo = `./db/${archivo}.txt`
    }

    async save(objeto) {
        let newId = 1
        try {
            const products = await this.getAll()
            let array = products

            if (array.length !== 0) {
                newId = array[array.length - 1].id + 1
                console.log(newId)

            } else {
                newId
            }
            const data = { id: newId, ...objeto }
            array.push(data)
            const newData = JSON.stringify(array)
            await fs.promises.writeFile(this.archivo, newData)
            return newId

        } catch (err) {
            throw new Error(err?.message);
        }
    }


    async getById(id) {
        try {
            const items = await this.getAll();
            return items.find((obj) => obj.id == id);
        } catch (err) {
            throw new Error(err?.message);
        }
    }

    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile(this.archivo, "utf-8"));
        } catch (err) {
            throw new Error(err?.message);
        }
    }

    async deleteById(id) {
        try {
            const item = await this.getById(id);
            let items = await this.getAll();

            if (!item) {
                return;
            }

            if (!items) {
                return;
            }

            items = items.filter((obj) => obj.id != item.id);
            await fs.promises.writeFile(this.archivo, JSON.stringify(items, null, 2));
        } catch (err) {
            throw new Error(err?.message);
        }
    }

    async updateById(id, object) {

        try {
            const products = await this.getAll()
            let array = products
            const encontrado = array.find(el => el.id == Number(id))
            console.log(object)

            if (encontrado) {
                let updateObj = null
                const newArray = array.map(elem => {
                    if (elem.id === Number(id)) {
                        updateObj = {id, ...object}
                        return {id, ...object}
                    }
                    return elem
                })
                console.log(newArray)
                const newData = JSON.stringify(newArray)
                await fs.promises.writeFile(this.archivo, newData)
                return updateObj
            } else {
                throw new Error(err?.message);
            }
        } catch (err) {
            throw new Error(err?.message);
        }

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async write(datos) {
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify(datos, null, 2));
        } catch (err) {
            throw new Error(err?.message);
        }
    }

    // async save(objeto) {
    //     let newId = 1
    //     try {
    //         const products = await this.getAll()
    //         let array = products.payload

    //         if (array.length !== 0) {
    //             newId = array[array.length - 1].id + 1
    //             console.log(newId)

    //         } else {
    //             newId
    //         }
    //         const data = { id: newId, ...objeto }
    //         array.push(data)
    //         const newData = JSON.stringify(array)
    //         await fs.promises.writeFile(this.archivo, newData)
    //         return { status: 'Success', message: `Un nuevo elemento fue agregado a la base de datos con el ID ${newId}`, id: newId }

    //     } catch (err) {
    //         return { status: 'Error', message: `No se pudo guardar el documento: ${err}` }
    //     }
    // }

    // async getById(id) {
    //     try {
    //         const products = await this.getAll()
    //         let array = products.payload
    //         const producto = array.find(product => product.id == Number(id));
    //         if (producto) {
    //             return { status: 'Success', message: `Se obtuvo el elemento con ID ${id} buscado`, payload: producto }
    //         } else {
    //             return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos` }
    //         }
    //     } catch (err) {
    //         return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos` }
    //     }
    // }

    // async getAll() {
    //     try {
    //         const objects = JSON.parse(await fs.promises.readFile(this.archivo, "utf-8"));
    //         return { status: 'Success', message: 'Se obtuvieron los elementos buscados.', payload: objects };
    //     } catch (err) {
    //         return { status: 'Error', message: `No se pudo realizar la busqueda ${err}.` }
    //     }
    // }

    // async deleteById(id) {
    //     try {
    //         const products = await this.getAll()
    //         let array = products.payload
    //         if (array.length == 0) {
    //             return { status: 'Error', message: `No se ha podido eliminar el objecto con ID ${id}.` }
    //         }
    //         const buscado = array.find((el) => el.id == id);
    //         if (buscado === undefined) {
    //             return { status: 'Error', message: `No se ha podido eliminar el objecto con ID ${id}.` }
    //         } else {
    //             let newArray = array.filter((item) => item.id != id);
    //             console.log(newArray)
    //             const newData = JSON.stringify(newArray)
    //             await fs.promises.writeFile(this.archivo, newData)
    //             return { status: 'Success', message: `Se elimino correctamente el objeto con ID ${id}` }
    //         }
    //     } catch (err) {
    //         return { status: 'Error', message: `No se ha podido eliminar el objecto con ID ${id}.` }
    //     }
    // }

    // async deleteAll() {
    //     try {   
    //         const stringNewData = JSON.stringify([])
    //         await fs.promises.writeFile(this.archivo, stringNewData)
    //         return true
    //     } catch (error) {
    //         return null
    //     }
    // }

    // async updateById(id, object) {
    //     const products = await this.getAll()
    //     let array = products.payload
    //     const encontrado = array.find(el => el.id == Number(id))
    //     console.log(object)

    //     if (encontrado) {
    //         try {
    //             const newArray = array.map(elem => {
    //                 if (elem.id === Number(id)) {
    //                     return {
    //                         id, ...object
    //                     }
    //                 }
    //                 return elem
    //             })

    //             console.log(newArray)
    //             const newData = JSON.stringify(newArray)
    //             await fs.promises.writeFile(this.archivo, newData)
    //             return { status: 'Success', message: `Se actualizo con éxito el objeto con ID ${id}` }
    //         } catch (err) {
    //             return { status: 'Error', message: `No se pudo actualizar el documento con ID ${id}` }
    //         }
    //     } else {
    //         return { status: 'Error', message: `No se pudo actualizar el documento con ID ${id}` }
    //     }

    // }

}

export default ContenedorArchivo;