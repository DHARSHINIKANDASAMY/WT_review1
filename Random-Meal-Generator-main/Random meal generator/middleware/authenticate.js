// middleware/authenticate.js

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Check if the Authorization header exists
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token with the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;  // Attach the decoded user information to the request
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    // If token is invalid
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authenticate;
