const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
process.loadEnvFile();
const exp_time = process.env.JWT_EXPIRATION_TIME;
const sec_key = process.env.JWT_SECRET_KEY;
const httpStatus = require("http-status");

const signinService = async (req, res) => {
    const { emailid, password } = req.body;
    try {
        const userexists = await usermodel.findOne({ emailid:emailid });
        if (!userexists) {
            return res.status(httpStatus.NOT_FOUND).json({ alert: "User not found" });

        }
        const chkpassword = await bcrypt.compare(password, userexists.password);
        if (!chkpassword) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: "Wrong credentials" });
        }




        const token = jwt.sign({ user: userexists }, sec_key);
        res.status(httpStatus.OK).json({
            name: userexists.name,
            emailid: userexists.emailid,
            role: userexists.role,
            subscriptionid: userexists.subscriptionid, token: token
        });

    } catch (error) {
        console.log(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error detected" });
    }

}
module.exports = signinService;
