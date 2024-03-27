const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const exp_time = process.env.JWT_EXPIRATION_TIME;
const sec_key = process.env.JWT_SECRET_KEY;

const signup = async (name, password, email) => {

    const userexists = await usermodel.findOne({ email: email });
    if (userexists) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
    }

    const hpassword = await bcrypt.hash(password, 8);
    const newuser = await usermodel.create({
        name,
        password: hpassword,
        email,
        role: "user"
    });

    const token = jwt.sign({ user: newuser }, sec_key, { expiresIn: exp_time });
    const response = {
        id: newuser.id,
        name: newuser.name,
        role: newuser.role,
        subscription: newuser.subscription,
        token: token
    };
    return response;
}

const signin = async (email, password) => {

    const userexists = await usermodel.findOne({ email: email });
    if (!userexists) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not Found");
    }
    const chkpassword = await bcrypt.compare(password, userexists.password);
    if (!chkpassword) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Password");
    }

    const token = jwt.sign({ user: userexists }, sec_key);
    const response = {
        id: userexists.id,
        name: userexists.name,
        role: userexists.role,
        subscription: userexists.subscription,
        token: token
    };
    return response;
}

module.exports = { signup, signin };
