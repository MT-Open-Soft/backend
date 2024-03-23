const httpStatus = require("http-status");
const signupservice=require("../services/signup.service");
const signinservice=require("../services/signin.service");
const catchAsync = require("../utils/catchAsync");

const signup = catchAsync(async(req,res) => {
   
    
    const response = await signupservice(req,res);
    res.send(response);
});

const signin = catchAsync(async(req,res) => {
    
    
    const response = await signinservice(req,res);
    res.send(response);
});
    
module.exports={signup,signin};
