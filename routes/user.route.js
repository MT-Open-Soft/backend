const express= require("express");
const userRouter= express.Router();
const {userhome,userid}=require("../controllers/user.controller");
const usermodel = require("../models/user.model");

userRouter.post("/",userhome);
userRouter.get("/:id", async (req, res) => {
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
userRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await usermodel.findById(id);
    console.log(req.params)
    let data = await user.deleteOne(req.params);
    res.status(200).json({ data });

});  
userRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usermodel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const userDataToUpdate = req.body;

        
        const updatedUser = await usermodel.findByIdAndUpdate(id, userDataToUpdate, { new: true });

        res.status(200).json({ data: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = userRouter;

module.exports = userRouter;