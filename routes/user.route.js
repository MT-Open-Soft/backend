const express = require("express");
const userRouter = express.Router();
const usermodel = require("../models/user.model");
const chkuser = require("../middleware/chkusermiddleware");
const httpStatus = require("http-status");


userRouter.get("/:id",chkuser, async (req, res) => {
   
    const { id } = req.params;

    try {
        const user = await usermodel.findById(id);
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
userRouter.delete("/:id",chkuser, async (req, res) => {
    const { id } = req.params;
    const user = await usermodel.findById(id);
    console.log(req.params)
    let data = await user.deleteOne(req.params);
    res.status(httpStatus.OK).json({ data });

});
userRouter.put("/:id",chkuser,async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usermodel.findById(id);
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
        }


        const userDataToUpdate = req.body;


        const updatedUser = await usermodel.findByIdAndUpdate(id, userDataToUpdate, { new: true });

        res.status(httpStatus.OK).json({ data: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
});

module.exports = userRouter;

module.exports = userRouter;