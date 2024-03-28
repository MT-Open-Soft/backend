import {User} from "../models/index.js";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import { Types } from "mongoose"
import bcrypt from "bcrypt";

const getUser = async (id) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User ID");
    }
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const response = {
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription
    };
    return response;
}

const deleteAccount = async (id) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User ID");
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return { message: "User deleted successfully" };
}

const updatePassword = async (oldPassword, newPassword, id) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User ID");
    }
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const chkpassword = await bcrypt.compare(oldPassword, user.password);
    if (!chkpassword) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Old Password Incorrect");
    }

    const hpassword = await bcrypt.hash(newPassword, 8);
    const userDataToUpdate = {
        password: hpassword

    };
    await User.findByIdAndUpdate(id, userDataToUpdate, { new: true });
    const response = {
        message: "Password updated successfully",
    };
    return response;

}


export default { getUser, deleteAccount, updatePassword };
