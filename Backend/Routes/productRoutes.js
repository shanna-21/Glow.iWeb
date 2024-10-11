import { ProductControllers } from "../Controllers/ProductControllers.js"; // Make sure to use the correct path
import { Router } from "express";

const productRoutes = Router();

productRoutes.get("/getProduct", ProductControllers.getProducts);

export { productRoutes };
