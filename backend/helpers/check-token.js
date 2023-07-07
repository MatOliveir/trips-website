const jwt = require('jsonwebtoken');

// middleware to validate token
const checkToken = (req, res, next) => {

  const token = req.header('auth-token');

  if(!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {

    const verified = jwt.verify(token, 'ourSecret');
    req.user = verified;
    next();

  } catch(err) {
    res.status(400).json({ error: 'Invalid token' })
  }

};

module.exports = checkToken;
