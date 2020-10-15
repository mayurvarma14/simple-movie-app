const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
  async create(data) {
    const user = await User.create(data);
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    delete user.password;
    return {
      accessToken,
      data: user,
    };
  },
};
