import express from "express";
import {searchController} from "../controllers/index.js";
const router = express.Router();

router.get("/suggestions", searchController.suggest);
router.get("/", searchController.search);

export default router;