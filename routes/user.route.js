const express = require("express");
const userRouter = express.Router();
const {userController}=require("../controllers");

userRouter.get("/",userController.getUserData);
userRouter.delete("/",userController.deleteProfile);
userRouter.put("/password",userController.updatePassword);

module.exports = userRouter;
