const express= require("express");
const {signup,signin}=require("../controllers/auth.controller");
const userRouter= express.Router();
const {userhome,userid}=require("../controllers/user.controller");
const usermodel = require("../models/user.model");

userRouter.post("/",userhome);
userRouter.get('/:id', async (req, res) => {
    const { id } = req.params; // Extracting the ID from the URL path parameters
    try {
        const user = await usermodel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = userRouter;