import { productosDao } from "../daos/index.js";


// GET /api/productos/
const getProducts = async (req, res) => {
    productosDao.getAll().then(item => {
        if (item.status === 'Error') {
            res.status(404).json(item.message);
        } else {
            res.json(item.payload)
        }
    })
}

// GET /api/productos/:id
const getProductsById = async (req, res) => {
    const { id } = req.params;
    productosDao.getById(id).then(item => {
        if (item.status === 'Error') {
            res.status(404).json(item.message);
        } else {
            res.status(200).json(item.payload)
        }
    })
}

// POST /api/productos/
const addProduct = async (req, res) => { 
    const { body } = req;
    if (Object.entries(body).length == 0 || Object.entries(body).length < 6) {
        res.status(422).json({
            error: "Faltan datos para la creación del producto",
        });
    } else {
        productosDao.save(body).then(product => {
            if (product.status === 'Error') {
                res.status(404).json(product.message);
            } else {
                res.status(201).json({ id: JSON.stringify(product.id) })
            }
        })
    }
}

// PUT /api/productos/:id
const updateProduct = async (req, res) => {
    const { body } = req;
    const id = req.params.id
    if (
        Object.entries(body).length === 0 ||
        Object.entries(body).length < 6
    ) {
        res.status(422).json({
            error: "Faltan datos para la actualizacion del producto",
        });
    } else {
        productosDao.updateById(id, body).then(item => {
            if (item.status === 'Error') {
                res.status(404).json(item.message);
            } else {
                res.status(201).json(item.message)
            }
        })
    }
}

// DELETE /api/productos/:id
const deleteProduct = async (req, res) => { 
    const { id } = req.params;
    productosDao.deleteById(id).then(item => {
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


export {getProducts, getProductsById, addProduct, updateProduct, deleteProduct}