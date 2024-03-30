import express from "express";
import multer from "multer"
const upload = multer();

import {userController} from "../controllers/index.js";
const userRouter = express.Router();

userRouter.get("/",userController.getUserData);
userRouter.delete("/",userController.deleteProfile);
userRouter.put("/password",userController.updatePassword);
userRouter.put("/avatar",upload.single('image'),userController.uploadImage);

export default userRouter;