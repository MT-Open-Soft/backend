const jwt = require('jsonwebtoken');
const usermodel = require("../models/user.model");
process.loadEnvFile();
const JWT_SECRET =process.env.JWT_SECRET_KEY;

const adminauthenticate = async(req, res, next) => {
  const token = req.header('Authorization');
  const tokenn = token.substring("Bearer ".length);
  const decoded = jwt.verify(tokenn, JWT_SECRET);

  const userId = decoded.user;  
  
   
   
    
    const role =userId.role;
    
    if(role===null || role===undefined){
      return res.status(401).json({ message: 'Null value' });

    }
    console.log(role);
    if (!userId) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (role !== "admin") {
      return res.status(401).json({ message: 'Admin page access denied.' });
    }


  try {

    
    console.log('Admin verified');

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }


};

module.exports = adminauthenticate;