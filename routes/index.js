const searchRouter = require("./search.route");
const authRouter = require("./auth.route");

const router = require("express").Router();

router.use("/auth",authRouter);
router.use("/search", searchRouter);

module.exports = router;
