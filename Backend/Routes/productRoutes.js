import { ProductControllers } from "../Controllers/ProductControllers.js";
import { Router } from "express";

const productRoutes = Router();

productRoutes.get("/getProduct", ProductControllers.getProducts);
productRoutes.get('/getProductById/:id' , ProductControllers.getProductById)
productRoutes.get("/getProductReviews/:id", ProductControllers.getProductReviews);

export { productRoutes };
