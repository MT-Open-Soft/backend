const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
process.loadEnvFile();
const exp_time = process.env.JWT_EXPIRATION_TIME;
const sec_key = process.env.JWT_SECRET_KEY;
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");



const signup = async (name, password, emailid, role) => {

    const userexists = await usermodel.findOne({ emailid: emailid });
    console.log(userexists);
    if (userexists) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");

    }
    if (role != "user") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid role");
    }
    const hpassword = await bcrypt.hash(password, 8);
    const newuser = await usermodel.create({
        name: name,
        password: hpassword,
        emailid: emailid,
        role: role,
        subscriptionid: 0

    });
    const token = jwt.sign({ user: newuser }, sec_key, { expiresIn: exp_time });
    const response = {
        name: newuser.name,
        id: newuser.id,
        emailid: newuser.emailid,
        role: newuser.role,
        subscriptionid: newuser.subscriptionid,
        token: token
    };
    return response;


}

const signin = async ( emailid, password,role) => {

    const userexists = await usermodel.findOne({ emailid: emailid });
    if (!userexists) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
    }
    const chkpassword = await bcrypt.compare(password, userexists.password);
    if (!chkpassword) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Wrong credentials");
    }
    if (role != "admin" && role != "user") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid role");
    }

    const token = jwt.sign({ user: userexists }, sec_key);
    const response = {
        name: userexists.name,
        id: userexists.id,
        emailid: userexists.emailid,
        role: userexists.role,
        subscriptionid: userexists.subscriptionid, token: token
    };
    return response;


}

module.exports = { signup, signin };
