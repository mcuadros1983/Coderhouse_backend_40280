const { Router } = require("express");
const router = Router();
const { renderIndex } = require("../controllers/indexControllers.js");
const { postProduct, getProductsTest } = require("../controllers/productControllers.js");
const { getRandoms } = require('../controllers/randomControllers.js')
const { getSystemInformation } = require('../controllers/systemControllers.js')
const { isAuthenticated } = require('./middleware/auth.js')
const compression = require("compression")

router.get("/", isAuthenticated, renderIndex);
router.get("/api/productos-test", getProductsTest);
router.post("/api/productos", postProduct);
router.get('/info/', getSystemInformation)
router.get('/infozip', compression(), getSystemInformation)
router.get("/api/randoms", getRandoms)

module.exports = router;
