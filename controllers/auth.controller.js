const httpStatus = require('http-status');
const catchAsync = require("../utils/catchAsync");
const authService =require("../services/auth.service");

const signup = catchAsync(async(req,res) => {
    const response = await authService.signup(req,res);
    res.send(response);
});

const signin = catchAsync(async(req,res) => {
    const response = await authService.signin(req,res);
    res.send(response);
});
    
module.exports={signup,signin};
