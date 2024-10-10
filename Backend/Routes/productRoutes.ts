import { ProductControllers } from "../Controllers/ProductControllers.ts"
import { Router } from "express";
const productRoutes = Router();

productRoutes.get("/getProduct", ProductControllers.getProducts)

export { productRoutes };