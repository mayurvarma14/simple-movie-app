const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const APIError = require('../utils/APIError');
const user = require('../api/user/services/user');

module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    const [scheme, accessToken] = req.headers.authorization.split(' ');
    try {
      if (scheme !== 'Bearer') {
        throw new APIError(httpStatus.UNAUTHORIZED, 'Invalid token scheme!');
      }
      const { userId, exp } = await jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );
      if (exp < Date.now() / 1000) {
        throw new APIError(httpStatus.UNAUTHORIZED, 'Token is expired!');
      }
      const loggedInUser = await user.findOne({ _id: userId });
      if (!loggedInUser) {
        throw new APIError(httpStatus.UNAUTHORIZED, 'User is not registered!');
      }
      req.user = loggedInUser;
    } catch (error) {
      return next(error);
    }
  }
  return next();
};
