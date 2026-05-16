import express from "express";
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controller/productController.js";

const productRoute = express.Router();

productRoute.post("/addProduct", addProduct);
productRoute.get("/getAllProducts", getAllProducts);
productRoute.get("/getSingleProduct/:id", getSingleProduct);
productRoute.put("/updateProduct/:id", updateProduct);
productRoute.delete("/deleteProduct/:id", deleteProduct);

export default productRoute;