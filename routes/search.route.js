import express from "express";

const router = express.Router();

import {searchController} from "../controllers//index.js"

router.get("/suggestions", searchController.suggest);

export default router;