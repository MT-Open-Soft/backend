const searchRouter = require("./search.route");
const moviesRouter = require("./movies.route");

const router = require("express").Router();

router.use("/search", searchRouter);
router.use("/movies", moviesRouter);

module.exports = router;