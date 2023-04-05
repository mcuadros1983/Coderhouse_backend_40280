//import mongoose from "mongoose";


class ContenedorMongoDb {
    constructor(model) {
        this.model = model;
    }

    async save(item) {
        try {
            const newItem = new this.model(item);
            await newItem.save();
            return newItem;
        } catch (err) {
            throw new Error(err?.message);
        }
    }

    async getById(id) {
        try {
            return await this.model.findById(id);
        } catch (err) {
            throw new Error(err?.message);
        }
    }

    async getAll() {
        try {
            return await this.model.find({});
        } catch (err) {
            throw new Error(err?.message);
        }
    }

    async deleteById(id) {
        try {
            const item = await this.getById(id);
            await this.model.deleteOne({ _id: id });
            return item;
        } catch (err) {
            throw new Error(err?.message);
        }
    }

    async updateById(id, item) {
        try {
            return await this.model.findByIdAndUpdate(id, item);
        } catch (err) {
            throw new Error(err?.message);
        }
    }
    // constructor(collectionName, schema) {
    //     this.collection = mongoose.model(collectionName, schema);
    // }

    // async save(object) {
    //     try {
    //         const newElement = await this.collection.create(object)
    //         return { status: 'Success', message: `Un nuevo elemento fue agregado a la base de datos con el ID ${newElement._id}`, id: newElement._id }
    //     } catch (err) {
    //         return { status: 'Error', message: `No se pudo guardar el documento: ${err}` }
    //     }
    // }

    // async getById(id) {
    //     try {
    //         let producto = await this.collection.findById(id);
    //         console.log(producto)
    //         if (producto) {
    //             return { status: 'Success', message: `Se obtuvo el elemento con ID ${id} buscado`, payload: producto }
    //         }
    //     } catch (err) {
    //         return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos` }
    //     }
    // }

    // async getAll() {
    //     try {
    //         let objects = await this.collection.find({});
    //         return { status: 'Success', message: 'Se obtuvieron los elementos buscados.', payload: objects }
    //     } catch (err) {
    //         return { status: 'Error', message: `No se pudo realizar la busqueda ${err}.` }
    //     }
    // }

    // async deleteById(id) {
    //     try {
    //         const element = await this.collection.findOneAndDelete({ _id: id })
    //         console.log(element)
    //         if (element) {
    //             return { status: 'Success', message: `Se elimino correctamente el objeto con ID ${id}` }
    //         } else {
    //             return { status: 'Error', message: `No se ha podido eliminar el objecto con ID ${id}.` }
    //         }
    //     } catch (error) {
    //         return { status: 'Error', message: `No se ha podido eliminar el objecto con ID ${id}.` }
    //     }
    // }

    // async deleteAll() {
    //     try {
    //         const contenido = await this.collection.find().delete()
    //         return true
    //     } catch (error) {
    //         return null
    //     }
    // }

    // async updateById(id, object) {
    //     try {
    //         const element = await this.collection.findByIdAndUpdate(id, object);
    //         console.log(element)
    //         return { status: 'Success', message: `Se actualizo con éxito el objeto con ID ${id}` }
    //     } catch (err) {
    //         console.log(err)
    //         return { status: 'Error', message: `No se pudo actualizar el documento con ID ${id}` }
    //     }
    // }

}
export default ContenedorMongoDb;