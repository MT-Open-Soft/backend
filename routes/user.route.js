const express = require("express");
const userRouter = express.Router();
const auth=require("../middleware/authmiddleware");
const userController=require("../controllers/user.controller");

userRouter.get("/:id",auth.authorizedUser,userController.getProfile);
userRouter.delete("/:id",auth.authorizedUser,userController.deleteProfile);
userRouter.put("/:id",auth.authorizedUser,userController.updateProfile);

module.exports = userRouter;
