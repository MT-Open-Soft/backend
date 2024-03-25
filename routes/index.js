import searchRouter from "./search.route";
import moviesRouter from "./movies.route";

const router = require("express").Router();

router.use("/search", searchRouter);
router.use("/movies", moviesRouter);

export default router;