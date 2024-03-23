const usermodel = require("../models/user.model");
const jwt= require("jsonwebtoken");
const bcrypt = require("bcrypt");
process.loadEnvFile();
const exp_time=process.env.JWT_EXPIRATION_TIME;
const sec_key =process.env.JWT_SECRET_KEY;
const httpStatus = require("http-status");

const signupservice = async(req,res) => {
   
    try{
        console.log(req.body);
        const{username, password,emailid,role,subscriptionid}= req.body;
        const userexists = await usermodel.findOne({username:username});
        console.log(userexists);
        if(userexists){
            return res.status(httpStatus.BAD_REQUEST).json({alert: "User already exists"});

        }

        const hpassword = await bcrypt.hash(password,8);

        const newuser = await usermodel.create({
            username: username,
            password: hpassword,
            emailid:emailid,
            role: role,
            subscriptionid: subscriptionid
        });
        
        const token =jwt.sign({user:newuser}, sec_key,{expiresIn: exp_time});
        res.status(httpStatus.CREATED).json({user:newuser, token: token});

    } catch(error){
        console.log(error); 
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:"Error detected"});

}
}
module.exports=signupservice;