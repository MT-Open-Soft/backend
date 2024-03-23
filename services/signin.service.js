const usermodel = require("../models/user.model");
const jwt= require("jsonwebtoken");
const bcrypt = require("bcrypt");
process.loadEnvFile();
const exp_time=process.env.JWT_EXPIRATION_TIME;
const sec_key =process.env.JWT_SECRET_KEY;
const httpStatus = require("http-status");

const signinservice =async(req,res)=>{
    const{username, password}= req.body;
    try{
        const userexists = await usermodel.findOne({username:username});
        if(!userexists){
            return res.status(httpStatus.NOT_FOUND).json({alert: "User not found"});

        }
        const chkpassword = await bcrypt.compare(password, userexists.password);
        if(!chkpassword){
            return res.status(httpStatus.BAD_REQUEST).json({message: "Wrong credentials"});
        }



        
        const token =jwt.sign({user: userexists}, sec_key);
        res.status(httpStatus.OK).json({user:userexists, token: token});

    } catch(error){
        console.log(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:"Error detected"});
    }
   
}
module.exports=signinservice;
