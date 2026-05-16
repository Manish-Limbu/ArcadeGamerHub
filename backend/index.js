import express from "express";
import db from "./connection/db.js";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./router/productRoute.js";
import userRouter from "./router/userRoute.js";
import categoryRouter from "./router/categoryRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);

app.listen(PORT, () => {
  console.log(`Server is started at http://localhost:${PORT}`);
});