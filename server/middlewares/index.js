const checkAuth = require('./checkAuth');
const isAuthenticated = require('./isAuthenticated');
const errorHandler = require('./errorHandler');
const cors = require('./cors');

module.exports = {
  checkAuth,
  isAuthenticated,
  errorHandler,
  cors,
};
