const usermodel = require("../models/user.model");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {userService}=require("../services");
const ApiError = require("../utils/ApiError");

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

const updatePassword = catchAsync(async(req,res) => {
    const {oldPassword,newPassword}=req.body;
    if(!oldPassword || !newPassword) throw new ApiError(httpStatus.BAD_REQUEST, "Missing old or new password");
    const userId = req.user._id;
    const response = await userService.updatePassword(oldPassword,newPassword,userId);
    res.send(response);
});



module.exports = {  getProfile, deleteProfile, updatePassword };
