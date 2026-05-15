import express from "express";
import db from "./connection/db.js";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./router/ProductRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/api', productRouter);

app.listen(PORT, () => {
  console.log(`Server is started at http://localhost:${PORT}`);
});