import express from "express";
 import cors from "cors";
import { subscribeController } from "../controllers/index.js";
import bodyParser from 'body-parser';
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cors()); 

router.post ("/createorder",subscribeController.createOrder);
router.post ("/verification",subscribeController.verifyOrder);

export default router;