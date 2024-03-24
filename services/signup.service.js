const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
process.loadEnvFile();
const exp_time = process.env.JWT_EXPIRATION_TIME;
const sec_key = process.env.JWT_SECRET_KEY;
const httpStatus = require("http-status");

const signupService = async (req, res) => {

    try {
        console.log(req.body);
        const { name, password, emailid, role, subscriptionid } = req.body;
        const userexists = await usermodel.findOne({ emailid:emailid });
        console.log(userexists);
        if (userexists) {
            return res.status(httpStatus.BAD_REQUEST).json({ alert: "User already exists" });

        }

        const hpassword = await bcrypt.hash(password, 8);

        const newuser = await usermodel.create({
            name: name,
            password: hpassword,
            emailid: emailid,
            role: role,
            subscriptionid: subscriptionid
        });

        const token = jwt.sign({ user: newuser }, sec_key, { expiresIn: exp_time });
        res.status(httpStatus.CREATED).json({
            name: newuser.name,
            emailid: newuser.emailid,
            role: newuser.role,
            subscriptionid: newuser.subscriptionid,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error detected" });

    }
}
module.exports = signupService;