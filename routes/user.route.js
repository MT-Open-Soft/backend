const express = require("express");
const userRouter = express.Router();
const {userController}=require("../controllers");

userRouter.get("/:id",userController.getProfile);
userRouter.delete("/:id",userController.deleteProfile);
userRouter.put("/:id",userController.updateProfile);

module.exports = userRouter;
