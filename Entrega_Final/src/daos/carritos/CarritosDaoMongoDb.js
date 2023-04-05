
import { carritoSchema } from "../../models/carrito.js";
import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"
import { ProductosDaoMongoDb } from "../productos/ProductosDaoMongoDb.js";

class CarritosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('carritos', carritoSchema)
        this.product = new ProductosDaoMongoDb()
    }

    async addProduct(id, id_prod) {
        try {
            let ref = await this.getById(id);
            let product = await this.product.getById(id_prod)

            await this.updateById(
                { _id: id },
                { $push: { productos: product.payload } }
            );
            return { status: 'Success', message: `Se agrego el producto de ID ${product.payload._id} al carrito de ID ${ref.payload._id}` };

        } catch (err) {
            return { status: 'Error', message: `Hubo un error: ${err}` };
        }
    }

    async deleteProductByIdCart(id, id_prod) {
        try {
            const product = await this.product.getById(id_prod)
            if (product.status == "Error") {
                return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos` }
            }
            const cart = await this.getById(id)
            if (cart.status == "Error") {
                return { status: 'Error', message: `No se encontro el elemento con ID ${id} en la base de datos` }
            }
            console.log("res3", cart.payload.productos)

            const isProdInCart = cart.payload.productos.some((e) => e._id == id_prod);
            if (!isProdInCart) {
                return { status: 'Error', message: `No existe el producto de ID ${id_prod} dentro del carrito de ID ${id}` };
            }

            const products = cart.payload.productos
            const deleteProduct = products.find((product) => String(product._id) == id_prod);
            products.splice(products.indexOf(deleteProduct), 1);

            const response = await this.updateById(id, {
                productos: products,
            });

            return { status: 'Success', message: `Se elimino el producto de ID ${id_prod} del carrito de ID ${id}`, result: response };
        } catch (err) {
            return { status: 'Error', message: `Hubo un error: ${err}` };
        }
    }
}
export { CarritosDaoMongoDb };