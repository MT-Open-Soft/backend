const httpStatus = require("http-status");
const signupService=require("../services/signup.service");
const signinService=require("../services/signin.service");
const catchAsync = require("../utils/catchAsync");

const signup = catchAsync(async(req,res) => {
   
    
    const response = await signupService(req,res);
    res.send(response);
});

const signin = catchAsync(async(req,res) => {
    
    
    const response = await signinService(req,res);
    res.send(response);
});
    
module.exports={signup,signin};
