const searchRouter = require("./search.route");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const router = require("express").Router();
const authenticate=require("../middleware/authmiddleware");

router.use("/auth",authRouter);
router.use("/search", searchRouter);
router.use("/users", authenticate,userRouter);


module.exports = router;
