const searchRouter = require("./search.route");
const moviesRouter = require("./movies.route");

const router = require("express").Router();

router.use("/search", searchRouter);

module.exports = router;