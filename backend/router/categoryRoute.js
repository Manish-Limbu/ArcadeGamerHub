import express from "express";
import { addCategory, getCategory, updateCategory } from "../controller/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/addCategory", addCategory);
categoryRouter.get("/getCategory", getCategory);
categoryRouter.put("/addCategory", updateCategory);

export default categoryRouter;