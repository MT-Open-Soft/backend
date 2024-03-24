const express = require("express");
const adminRouter = express.Router();
const userController = require("../controllers/user.controller");
const adminController=require("../controllers/admin.controller");

adminRouter.get("/users", userController.userHome);
adminRouter.post("/", adminController.createMovie);
adminRouter.get("/:id",adminController.getMovie );
adminRouter.delete("/:id",adminController.deleteMovie );
adminRouter.put("/:id",adminController.updateMovie);


module.exports = adminRouter;