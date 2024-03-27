const usermodel = require("../models/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { ObjectId } = require("mongoose").Types;
const bcrypt = require("bcrypt");

const getAccount = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User ID");
    }
    const user = await usermodel.findById(id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const response = {
        name: user.name,
        emailid: user.emailid,
        role: user.role,
        subscriptionid: user.subscriptionid
    };
    return response;
}

const deleteAccount = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User ID");
    }

    const user = await usermodel.findByIdAndDelete(id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return { message: "User deleted successfully" };
}

const updatePassword = async (oldPassword, newPassword, id) => {
    if (!ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User ID");
    }
    const user = await usermodel.findById(id);
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
    await usermodel.findByIdAndUpdate(id, userDataToUpdate, { new: true });
    const response = {
        message: "Password updated successfully",
    };
    return response;

}


module.exports = { getAccount, deleteAccount, updatePassword };
