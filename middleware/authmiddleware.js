const jwt = require('jsonwebtoken');
process.loadEnvFile();
const JWT_SECRET =process.env.JWT_SECRET_KEY;

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }


  try {
    const tokenn = token.substring("Bearer ".length);
    const decoded = jwt.verify(tokenn, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;