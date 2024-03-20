const usermodel = require("../models/user.model");

const userhome = async (req, res) => {
    try {
        const users = await usermodel.find();
        res.status(200).json({ users: users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports={userhome};
