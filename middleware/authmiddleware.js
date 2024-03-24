const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
process.loadEnvFile();
const JWT_SECRET =process.env.JWT_SECRET_KEY;

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Authorization token is required.' });
  }


  try {
    const tokenn = token.substring("Bearer ".length);
    const decoded = jwt.verify(tokenn, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid token.' });
  }
};

const authorizedUser = (req, res, next) => {
  const { id } = req.params;
  const token = req.header('Authorization');

  if (!token) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'Authorization token is required.' });
  }

  try {
      const tokenn = token.substring("Bearer ".length);
      const decoded = jwt.verify(tokenn, JWT_SECRET);
      const userId = decoded.user; 
      if (userId._id !== id) {
          return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized access.' });
      }
      req.user = decoded.user;
      next();
  } catch (err) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid token.' });
  }
};


module.exports = {authenticate,authorizedUser};