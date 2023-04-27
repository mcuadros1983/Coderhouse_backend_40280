import { Router } from "express";
import { renderIndex } from "../controllers/indexControllers.js";
import { getProducts, updateProduct, deleteProduct, addProduct, getProductsTest } from "../controllers/productControllers.js";
import { getRandoms } from '../controllers/randomControllers.js';
import { getSystemInformation } from '../controllers/systemControllers.js';
import { isAuthenticated } from './middleware/auth.js';
import compression from "compression";

const router = Router();

router.get("/", isAuthenticated, renderIndex);
router.get("/api/productos-test", getProductsTest);
router.get('/api/productos', getProducts)
router.post("/api/productos", addProduct);
router.put("/api/productos/:id", updateProduct);
router.delete("/api/productos/:id", deleteProduct);
router.get('/info/', getSystemInformation)
router.get('/infozip', compression(), getSystemInformation)
router.get("/api/randoms", getRandoms)



export default router;
