/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

// in this file, we implement auth.js middleware for the authentication of the user

const jwt = require('jsonwebtoken');
const User = require('../../domain/user'); // import user model

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, '12345');
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(403).send({
      error: 'Please authenticate.',
    });
  }
};
module.exports = auth;
