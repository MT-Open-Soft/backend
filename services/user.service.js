const usermodel = require("../models/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const {ObjectId} = require("mongoose").Types;

const getAccount = async (id) => {
    if(!ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ID");
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
    if(!ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ID");
      }    
    console.log(id)
    await usermodel.deleteOne({ id: id });
    const response = { message: "User deleted successfully" };
    return response;

}
const updateAccount = async (data, id) => {
    if(!ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ID");
      }
    const userDataToUpdate = data;
    const updatedUser = await usermodel.findByIdAndUpdate(id, userDataToUpdate, { new: true });
    const response = {
        name: updatedUser.name,
        emailid: updatedUser.emailid,
        role: updatedUser.role,
        subscriptionid: updatedUser.subscriptionid
    };
    return response;

}

module.exports = { getAccount, deleteAccount, updateAccount };
