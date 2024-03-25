const catchAsync = require("../utils/catchAsync");
const {authService} =require("../services");

const signup = catchAsync(async(req,res) => {
    const {name, password, emailid,role} =req.body;
    const response = await authService.signup(name, password, emailid,role);
    res.send(response);
});

const signin = catchAsync(async(req,res) => {
    const { emailid, password,role } = req.body;
    const response = await authService.signin( emailid, password,role);
    res.send(response);
});
    
module.exports={signup,signin};
