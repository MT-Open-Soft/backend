import express from "express";
import searchRouter from "./search.route.js";
import moviesRouter from "./movies.route.js";

const router = express.Router();

router.use("/search", searchRouter);
router.use("/movies", moviesRouter);

export default router;