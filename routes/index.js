const searchRouter = require("./search.route");
const authRouter = require("./auth.route");
const adminRouter = require("./admin.route");
const userRouter = require("./user.route");
const {authenticate, adminauthenticate} = require("../middleware/authmiddleware");

const router = require("express").Router();

router.use("/auth",authRouter);
router.use("/search", searchRouter);
router.use("/user", authenticate,userRouter);
router.use("/admin", authenticate,adminauthenticate,adminRouter);

module.exports = router;
