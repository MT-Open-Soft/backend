const express= require("express");
const {signup}=require("../controllers/auth.controller");
const adminRouter= express.Router();

adminRouter.post("/",signup);




module.exports = adminRouter;