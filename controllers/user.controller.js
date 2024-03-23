const usermodel = require("../models/user.model");
const httpStatus = require("http-status");
const userhome = async (req, res) => {
    try {
        const users = await usermodel.find();
        res.status(httpStatus.OK).json({ users: users });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}


module.exports={userhome};
