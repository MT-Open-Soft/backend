const express = require("express");
const adminRouter = express.Router();
const {adminController}=require("../controllers");

adminRouter.get("/users", adminController.getUsers);

adminRouter.post("/movies", adminController.createMovie);
adminRouter.delete("/movies/:id",adminController.deleteMovie );
adminRouter.put("/movies/:id",adminController.updateMovie);


module.exports = adminRouter;