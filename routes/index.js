import searchRouter from "./search.route.js"
import authRouter from "./auth.route.js"
import adminRouter from "./admin.route.js"
import userRouter from "./user.route.js"
import moviesRouter from "./movies.route.js"
import {authenticate, adminauthenticate} from "../middleware/authmiddleware.js";
import express from "express";

const router = express.Router();

router.use("/auth",authRouter);
router.use("/search", searchRouter);
router.use("/user", authenticate,userRouter);
router.use("/admin", authenticate,adminauthenticate,adminRouter);
router.use("/movies", moviesRouter);

export default router;