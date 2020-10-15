const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

module.exports = (req, res, next) => {
  if (!req.user) {
    next(new APIError(httpStatus.UNAUTHORIZED, 'User not authorized!'));
  } else {
    next();
  }
};
