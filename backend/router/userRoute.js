import express from "express";
import { getAllUsers, getSingleUser } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get('/getAllUsers', getAllUsers);
userRouter.get('/getSingleUser', getSingleUser);

export default userRouter;