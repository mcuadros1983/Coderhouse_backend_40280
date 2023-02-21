import { carritosDao } from "../daos/index.js";
//import { productosDao } from "../daos/index.js";

// GET /api/carrito/:id/productos
const getProductsOfaCart = async (req, res) => {
    let { id } = req.params;
    carritosDao.getById(id).then(item => {
        if (item.status === 'Error') {
            res.status(404).json(item.message);
        } else {
            res.status(200).json(item.payload)
        }
    })
}

// GET /api/carrito/
const getCarts = async (req, res) => {
    carritosDao.getAll().then(items => {
        if (items.status === 'Error') {
            res.status(404).json(items.message);
        } else {
            res.status(200).json(items.payload)
        }
    })
}


// POST /api/carrito
const createCart = async (req, res) => {
    let newCart = {
        //id: 1,
        timestamp: new Date().toLocaleDateString(),
        productos: []
    };
    if (
        Object.entries(newCart).length === 0 ||
        Object.entries(newCart).length < 2
    ) {
        res.status(422).json({
            error: "Faltan datos para la creación del carrito",
        });

    } else {
        carritosDao.save(newCart).then(item => {
            if (item.status === 'Error') {
                res.status(404).json(item.message);
            } else {
                res.status(201).json({ id: JSON.stringify(item.id) })
            }
        })
    }
}

// POST /api/carrito/:id/productos/id_prod
const addProductOfaCart = async (req, res) => {
    const { id, id_prod } = req.params;
    carritosDao.addProduct(id, id_prod).then(item => {
        if (item.status === 'Error') {
            return res.status(404).send({
                status: 'Error',
                message: item.message
            });
        } else {
            return res.status(201).send({
                status: 'Success',
                message: item.message
            })
        }
    })
}


// DELETE /api/carrito/:id
const deleteCart = async (req, res) => {
    let { id } = req.params;
    carritosDao.deleteById(id).then(item => {
        if (item.status === 'Error') {
            return res.status(404).send({
                status: 'Error',
                message: item.message
            });
        } else {
            return res.status(201).send({
                status: 'Success',
                message: item.message
            })
        }
    })
}

// DELETE /api/carrito/:id/productos/:id_prod
const deleteProductOfaCart = async (req, res) => {
    const { id, id_prod } = req.params;
    carritosDao.deleteProductByIdCart(id, id_prod).then(item => {
        if (item.status == 'Error') {
            return res.status(404).send({
                status: 'Error',
                message: item.message
            });
        } else {
            return res.status(201).send({
                status: 'Success',
                message: item.message
            })
        }
    })
}


export { getProductsOfaCart, getCarts, createCart, addProductOfaCart, deleteCart, deleteProductOfaCart }