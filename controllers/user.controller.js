const usermodel = require("../models/user.model");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {userService}=require("../services");


const getProfile = catchAsync(async(req,res) => {
    const { id } = req.params;
    const response = await userService.getAccount(id);
    res.send(response);
});

const deleteProfile = catchAsync(async(req,res) => {
    const { id } = req.params;
    const response = await userService.deleteAccount(id);
    res.send(response);
});

const updateProfile = catchAsync(async(req,res) => {
    const {oldPassword,newPassword}=req.body;
    const {id} =req.params;
    const response = await userService.updatePassword(oldPassword,newPassword,id);
    res.send(response);
});



module.exports = {  getProfile, deleteProfile, updateProfile };
