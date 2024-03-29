import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import {userService} from "../services/index.js";

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

export default {  getUserData, deleteProfile, updatePassword };
