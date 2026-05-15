import express from "express";
import { addCategory, addProduct, getAllProducts, getCategory, getSingleProduct } from "../controller/Product.js";

const productRoute = express.Router();

productRoute.post("/addCategory", addCategory);
productRoute.get("/getCategory", getCategory);
productRoute.post("/addProduct", addProduct);
productRoute.get("/getAllProducts", getAllProducts);
productRoute.get("/getSingleProduct/:id", getSingleProduct);

export default productRoute;