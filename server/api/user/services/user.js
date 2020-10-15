const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const User = require('../models/user');
const APIError = require('../../../utils/APIError');

module.exports = {
  async generateToken(userId, expiresIn = '1d') {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn,
    });
  },
  async create(data) {
    const user = await (await User.create(data)).toObject();
    const accessToken = await this.generateToken(user.id);
    delete user.password;
    return {
      accessToken,
      user,
    };
  },
  async findOne(data, select = []) {
    return User.findOne(data).select(select);
  },
  async login(email, password) {
    const user = await this.findOne({ email }, ['+password']);
    if (!user) {
      throw new APIError(httpStatus.FORBIDDEN, 'Incorrect email or password!');
    }
    if (await user.passwordMatches(password)) {
      const accessToken = await this.generateToken(user.id);
      return { user: { ...user.toObject(), password: undefined }, accessToken };
    }
    throw new APIError(httpStatus.FORBIDDEN, 'Incorrect email or password!');
  },
};
