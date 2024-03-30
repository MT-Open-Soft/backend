import jwt  from "jsonwebtoken"
import bcrypt from "bcrypt"
import httpStatus  from "http-status"

import {User} from "../models/index.js";
import ApiError from "../utils/ApiError.js";

import { JWT_SECRET, JWT_EXPIRATION_TIME } from "../utils/config.js";

const signup = async (name, password, email) => {

    const userexists = await User.findOne({ email: email });
    if (userexists) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
    }

    const hpassword = await bcrypt.hash(password, 8);
    const newuser = await User.create({
        name,
        password: hpassword,
        email,
        role: "user"
    });

    const token = jwt.sign({ user: newuser }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
    const response = {
        id: newuser.id,
        avatar: newuser.avatar,
        name: newuser.name,
        role: newuser.role,
        subscription: newuser.subscription,
        token: token
    };
    return response;
}

const signin = async (email, password) => {

    const userexists = await User.findOne({ email: email });
    if (!userexists) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not Found");
    }
    const chkpassword = await bcrypt.compare(password, userexists.password);
    if (!chkpassword) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Password");
    }

    const token = jwt.sign({ user: userexists }, JWT_SECRET);
    const response = {
        avatar: userexists.avatar,
        id: userexists.id,
        name: userexists.name,
        role: userexists.role,
        subscription: userexists.subscription,
        token: token
    };
    return response;
}

export default { signup, signin };
