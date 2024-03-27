import express from "express";
import searchRouter from "./search.route.js";
import moviesRouter from "./movies.route.js";
import subscribeRouter from "./subscribe.route.js";

const router = express.Router();

router.use("/search", searchRouter);
router.use("/subscribe", subscribeRouter);
router.use("/movies", moviesRouter);

export default router;