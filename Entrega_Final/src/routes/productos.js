import { Router } from "express";
import {getProducts, getProductsById, addProduct, updateProduct, deleteProduct} from "../controllers/productosControllers.js"
const productRouter = Router();

// GET /api/productos/:id?
productRouter.get("/:id?", getProducts)








// GET /api/productos/
productRouter.get("/", getProducts)

// GET /api/productos/:id
// productRouter.get("/:id", getProductsById)

// POST /api/productos/
productRouter.post("/", addProduct)

// PUT /api/productos/:id
productRouter.put("/:id", updateProduct)

// DELETE /api/productos/:id
productRouter.delete("/:id", deleteProduct)

//import { Router } from "express";
// import { productosDao as productoApi } from "../daos/index.js";
//import { productosDao } from "../daos/index.js"

// const router = Router();

// router.get("/", async (req, res) => {
//     productosDao.getAll().then(item => {
//         if (item.status === 'Error') {
//             res.status(404).json(item.message);
//         } else {
//             res.json(item.payload)
//         }
//     })
// });

// router.get("/:id?", async (req, res) => {
//     const { id } = req.params;
//     productosDao.getById(id).then(item => {
//         if (item.status === 'Error') {
//             res.status(404).json(item.message);
//         } else {
//             res.status(200).json(item.payload)
//         }
//     })
// });


// router.post("/", async (req, res) => {
//     const { body } = req;
//     if (Object.entries(body).length == 0 || Object.entries(body).length < 6) {
//         res.status(422).json({
//             error: "Faltan datos para la creación del producto",
//         });
//     } else {
//         productosDao.save(body).then(product => {
//             if (product.status === 'Error') {
//                 res.status(404).json(product.message);
//             } else {
//                 res.status(201).json({ id: JSON.stringify(product.id) })
//             }
//         })
//     }
// });

// router.put("/:id", async (req, res) => {
//     const { body } = req;
//     const id = req.params.id
//     if (
//         Object.entries(body).length === 0 ||
//         Object.entries(body).length < 6
//     ) {
//         res.status(422).json({
//             error: "Faltan datos para la actualizacion del producto",
//         });
//     } else {
//         productosDao.updateById(id, body).then(item => {
//             if (item.status === 'Error') {
//                 res.status(404).json(item.message);
//             } else {
//                 res.status(201).json(item.message)
//             }
//         })
//     }
// });

// router.delete("/:id", async (req, res) => {
//     const { id } = req.params;
//     productosDao.deleteById(id).then(item => {
//         if (item.status == 'Error') {
//             return res.status(404).send({
//                 status: 'Error',
//                 message: item.message
//               });
//         } else {
//             return res.status(201).send({
//                 status: 'Success',
//                 message: item.message
//               })
//         }
//     })
// });

export default productRouter;