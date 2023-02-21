
import { Router } from "express";
import { getProductsOfaCart, getCarts, createCart, addProductOfaCart, deleteCart, deleteProductOfaCart } from "../controllers/carritoControllers.js"
const cartRouter = Router();


// GET /api/carrito/:id/productos
cartRouter.get("/:id/productos",getProductsOfaCart)

// GET /api/carrito/
cartRouter.get("/:id/productos",getCarts)

// POST /api/carrito
cartRouter.post("/:id/productos",createCart)

// POST /api/carrito/:id/productos/id_prod
cartRouter.post("/:id/productos",addProductOfaCart)

// DELETE /api/carrito/:id
cartRouter.delete("/:id/productos",deleteCart)

// DELETE /api/carrito/:id/productos/:id_prod
cartRouter.delete("/:id/productos",deleteProductOfaCart)


// import { Router } from "express";
// import { carritosDao } from "../daos/index.js";
// import { productosDao } from "../daos/index.js";
// const router = Router();

// // GET /api/carrito/:id/productos
// router.get("/:id/productos", async (req, res) => {
//   let { id } = req.params;
//   carritosDao.getById(id).then(item => {
//     if (item.status === 'Error') {
//       res.status(404).json(item.message);
//     } else {
//       res.status(200).json(item.payload)
//     }
//   })
// });

// // GET /api/carrito/
// router.get("/", async (req, res) => {
//   carritosDao.getAll().then(items => {
//     if (items.status === 'Error') {
//       res.status(404).json(items.message);
//     } else {
//       res.status(200).json(items.payload)
//     }
//   })
// });

// // // POST /api/carrito
// router.post("/", async (req, res) => {
//   let newCart = {
//     //id: 1,
//     timestamp: new Date().toLocaleDateString(),
//     productos: []
//   };
//   if (
//     Object.entries(newCart).length === 0 ||
//     Object.entries(newCart).length < 2
//   ) {
//     res.status(422).json({
//       error: "Faltan datos para la creación del carrito",
//     });

//   } else {
//     carritosDao.save(newCart).then(item => {
//       if (item.status === 'Error') {
//         res.status(404).json(item.message);
//       } else {
//         res.status(201).json({ id: JSON.stringify(item.id) })
//       }
//     })
//   }
// });

// // POST /api/carrito/:id/productos/id_prod
// router.post("/:id/productos/:id_prod", async (req, res) => {
//   const { id, id_prod } = req.params;
//   carritosDao.addProduct(id, id_prod).then(item => {
//     if (item.status === 'Error') {
//       return res.status(404).send({
//         status: 'Error',
//         message: item.message
//       });
//     } else {
//       return res.status(201).send({
//         status: 'Success',
//         message: item.message
//       })
//     }
//   })
// });

// // DELETE /api/carrito/:id
// router.delete("/:id", async (req, res) => {
//   let { id } = req.params;
//   carritosDao.deleteById(id).then(item => {
//     if (deletedCart.status === 'Error') {
//       return res.status(404).send({
//         status: 'Error',
//         message: deletedCart.message
//       });
//     } else {
//       return res.status(201).send({
//         status: 'Success',
//         message: deletedCart.message
//       })
//     }
//   })
// });

// // DELETE /api/carrito/:id/productos/:id_prod
// router.delete("/:id/productos/:id_prod", async (req, res) => {
//   const { id, id_prod } = req.params;
//   carritosDao.deleteProductByIdCart(id, id_prod).then(item => {
//     if (deletedProduct.status == 'Error') {
//       return res.status(404).send({
//         status: 'Error',
//         message: deletedProduct.message
//       });
//     } else {
//       return res.status(201).send({
//         status: 'Success',
//         message: deletedProduct.message
//       })
//     }
//   })
// })

export default cartRouter;