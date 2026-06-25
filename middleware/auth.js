const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
  const token = req.header('Authorization');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.replace("Bearer ", ""), config.get('secretOrKey'));
    req.user = decoded; // attach user payload to request
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;
