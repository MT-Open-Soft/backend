import express from "express"
import multer from "multer"
const upload = multer();

import {authController} from "../controllers/index.js";

const authRouter= express.Router();

authRouter.post("/signup",upload.single('image'),authController.signup);
authRouter.post("/signin",authController.signin);

export default authRouter;