const express = require('express');
const path = require('path');
const logger = require('morgan');
const compress = require('compression');
const helmet = require('helmet');

const httpStatus = require('http-status');

const database = require('./config/database');
const { routes } = require('./api');
const APIError = require('./utils/APIError');
const { checkAuth, errorHandler, cors } = require('./middlewares');

const app = express();

database.connect();

// request logging
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// set gzip compression
app.use(compress());

// set security headers
app.use(helmet());

// set cors
app.use(cors);

app.use(checkAuth);

// set api routes
app.use('/', routes);

// catch 404
app.use((req, res, next) => {
  console.log('test');
  next(new APIError(httpStatus.NOT_FOUND, 'Not found'));
});

// error handler
app.use(errorHandler);

module.exports = app;
