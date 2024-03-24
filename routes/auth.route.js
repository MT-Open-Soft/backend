const express= require("express");
const authRouter= express.Router();
const {authController}=require("../controllers");


authRouter.post("/signup",authController.signup);

authRouter.post("/signin",authController.signin);


module.exports = authRouter;