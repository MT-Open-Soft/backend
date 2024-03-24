const usermodel = require("../models/user.model");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const userService=require("../services/user.service");

const userHome = catchAsync(async(req,res) => {
    const response = await userService.userlist(req,res);
    res.send(response);
});
const getProfile = catchAsync(async(req,res) => {
    const response = await userService.getAccount(req,res);
    res.send(response);
});

const deleteProfile = catchAsync(async(req,res) => {
    const response = await userService.deleteAccount(req,res);
    res.send(response);
});

const updateProfile = catchAsync(async(req,res) => {
    const response = await userService.updateAccount(req,res);
    res.send(response);
});



module.exports = { userHome, getProfile, deleteProfile, updateProfile };
