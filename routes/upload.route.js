import express from "express"
import multer from "multer"
const upload = multer();

import {uploadController} from "../controllers/index.js";

const uploadRouter= express.Router();

uploadRouter.post("/upload",upload.single('image'),uploadController.signup);

export default uploadRouter;