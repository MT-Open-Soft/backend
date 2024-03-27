const catchAsync = require("../utils/catchAsync");
const {authService} =require("../services");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const signup = catchAsync(async(req,res) => {
    const {name, password, email} =req.body;
    if(!name || !password || !email){
        throw new ApiError(httpStatus.BAD_REQUEST, "Missing name, email or password");
    }
    const response = await authService.signup(name, password, email);
    res.status(httpStatus.CREATED).json(response);
});

const signin = catchAsync(async(req,res) => {
    const { email, password } = req.body;
    if(!email || !password){
        throw new ApiError(httpStatus.BAD_REQUEST, "Missing email or password");
    }
    const response = await authService.signin( email, password);
    res.status(httpStatus.OK).json(response);
});
    
module.exports={signup,signin};
