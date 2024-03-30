import express from "express";
import { subscribeController } from "../controllers/index.js";
const router = express.Router();

router.post ("/createorder",subscribeController.createOrder);
router.post ("/verification",subscribeController.verifyOrder);

export default router;