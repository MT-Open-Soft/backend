const usermodel = require("../models/user.model");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {userService}=require("../services");
const ApiError = require("../utils/ApiError");

const getUserData = catchAsync(async(req,res) => {
    const userId = req.user._id;
    const response = await userService.getUser(userId);
    res.status(httpStatus.OK).json(response);
});

const deleteProfile = catchAsync(async(req,res) => {
    const userId = req.user._id;
    const response = await userService.deleteAccount(userId);
    res.status(httpStatus.OK).json(response);
});

const updatePassword = catchAsync(async(req,res) => {
    const {oldPassword,newPassword}=req.body;
    if(!oldPassword || !newPassword) throw new ApiError(httpStatus.BAD_REQUEST, "Missing old or new password");
    const userId = req.user._id;
    const response = await userService.updatePassword(oldPassword,newPassword,userId);
    res.status(httpStatus.OK).json(response);
});

module.exports = {  getUserData, deleteProfile, updatePassword };
