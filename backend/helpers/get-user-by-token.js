const jwt = require('jsonwebtoken');

const User = require('../models/user');

// get user by jwt
const getUserByToken = async (token) => {

  if(!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  // find user
  const decoded = jwt.verify(token, 'ourSecret');

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  return user;

}

module.exports = getUserByToken