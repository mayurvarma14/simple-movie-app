const httpStatus = require('http-status');
const { ValidationError } = require('express-validation');

module.exports = (err, req, res, next) => {
  try {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const response = {
      code: statusCode,
      message: err.message || httpStatus[statusCode],
      stack: err.stack,
    };
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }
    delete response.errors;
    if (req.app.get('env') !== 'development') {
      delete response.stack;
    }
    res.status(statusCode);
    return res.json(response);
  } catch (error) {
    console.log('Log: error', error);
    return res.json({});
  }
};
