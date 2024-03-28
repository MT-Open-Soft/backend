import express from "express";

import {userController} from "../controllers/index.js";
const userRouter = express.Router();

userRouter.get("/",userController.getUserData);
userRouter.delete("/",userController.deleteProfile);
userRouter.put("/password",userController.updatePassword);

export default userRouter;