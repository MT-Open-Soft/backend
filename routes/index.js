const searchRouter = require("./search.route");
const authRouter = require("./auth.route");
const adminRouter = require("./admin.route");
const userRouter = require("./user.route");
const router = require("express").Router();
const authenticate=require("../middleware/authmiddleware");
const adminauthenticate =require("../middleware/adminauthmiddleware");

router.use("/auth",authRouter);
router.use("/search", searchRouter);
router.use("/users", authenticate,userRouter);
router.use("/admin", authenticate,adminauthenticate,adminRouter);
module.exports = router;
