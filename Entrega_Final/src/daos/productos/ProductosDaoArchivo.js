import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";
import fs from "fs";

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("productos");
    }

    // async createProduct(object) {
    //     try {
    //         const newId = await this.save(object)
    //         return newId
    //     } catch (error) {
    //         //console.log(error)
    //         return res.status(404).json({
    //             error: `Error ${error}`
    //         });
    //     }
    // }
}

export { ProductosDaoArchivo };