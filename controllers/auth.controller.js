const catchAsync = require("../utils/catchAsync");
const {authService} =require("../services");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const signup = catchAsync(async(req,res) => {
    const {name, password, emailid} =req.body;
    if(!name || !password || !emailid){
        throw new ApiError(httpStatus.BAD_REQUEST, "Missing name, email or password");
    }
    const response = await authService.signup(name, password, emailid);
    res.status(httpStatus.CREATED).json(response);
});

const signin = catchAsync(async(req,res) => {
    const { emailid, password } = req.body;
    if(!emailid || !password){
        throw new ApiError(httpStatus.BAD_REQUEST, "Missing email or password");
    }
    const response = await authService.signin( emailid, password);
    res.status(httpStatus.OK).json(response);
});
    
module.exports={signup,signin};
