const usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");
const signup=async(req,res)=>{
    try{
        console.log(req.body);
        const{username, password,subscriptionid}= req.body;
        const userexists = await usermodel.findone({username:username});
        if(userexists){
            return res.status(400).json({alert: "User already exists"});

        }

        const hpassword = await bcrypt.hash(password,8);

        const newuser = await usermodel.create({
            username: username,
            password: hpassword,
        });
        
        const token =jwt.sign({username: newuser.username}, sec_key);
        res.status(201).json({user:newuser, token: token});

    } catch(error){
        console.log(error);
        res.status(500).json({message:"Error detected"});
    }
}
    const signin =async(req,res)=>{
        const{username, password}= req.body;
        try{
            const userexists = await usermodel.findone({username:username});
            if(!userexists){
                return res.status(404).json({alert: "User not found"});
    
            }
            const chkpassword = await bcrypt.compare(password, userexists.password);
            if(!chkpassword){
                return res.status(400).json({message: "Wrong credentials"});
            }

    

            
            const token =jwt.sign({username: newuser.username}, sec_key);
            res.status(201).json({user:newuser, token: token});
    
        } catch(error){
            console.log(error);
            res.status(500).json({message:"Error detected"});
        }
    


    
}

module.exports={signup,signin};