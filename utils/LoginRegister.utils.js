const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerutils = async (password) => {
  return bcrypt.hash(password, 10);
};
const LoginUtils = async (password, findemail) => {
  return jwt.sign({ id: findemail._id, email: findemail.email }, process.env.SECRET_KEY, {
    expiresIn: '10d',
  });
};
module.exports = { registerutils, LoginUtils };
