import {User} from "../models/index.js";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import { Types } from "mongoose"
import bcrypt from "bcrypt";
import axios from 'axios';
import FormData from 'form-data';
import { IMGUR_CLIENT_ID } from '../utils/config.js';

const getUser = async (id) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User ID");
    }
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const response = {
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
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
        throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect old password");
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

const uploadImage = async(image,email) => {    
    const data = new FormData();
    
    data.append('image',image);
    const headers = {
        headers: { 
            Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
            ...data.getHeaders()
        }
    }
    const uploadData = await axios.post('https://api.imgur.com/3/image',data,headers);     
    const user = await User.findOneAndUpdate({email: email}, { $set: { avatar: uploadData.data.data.link }, $currentDate: { lastModified: true } }, {new: true});
    if(!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return {
        message: "Image uploaded successfully",
        avatar: user.avatar
    };
}



export default { getUser, deleteAccount, updatePassword ,uploadImage};
