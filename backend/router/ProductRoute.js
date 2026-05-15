import express from "express";
import { addCategory, addProduct, deleteProduct, getAllProducts, getCategory, getSingleProduct, updateProduct } from "../controller/Product.js";

const productRoute = express.Router();

productRoute.post("/addCategory", addCategory);
productRoute.get("/getCategory", getCategory);
productRoute.post("/addProduct", addProduct);
productRoute.get("/getAllProducts", getAllProducts);
productRoute.get("/getSingleProduct/:id", getSingleProduct);
productRoute.put("/updateProduct/:id", updateProduct);
productRoute.delete("/deleteProduct/:id", deleteProduct);

export default productRoute;