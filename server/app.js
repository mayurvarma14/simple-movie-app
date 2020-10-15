const express = require('express');
const path = require('path');
const logger = require('morgan');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { ValidationError } = require('express-validation');

const { routes } = require('./api');

const app = express();

// MongoDB Setup
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('MongoDb Error!!');
  process.exit();
});

// request logging
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// set gzip compression
app.use(compress());

// set security headers
app.use(helmet());

// set cors to allow below urls
const allowedOrigins = [
  'http://127.0.0.1:3000',
  'https://simple-movie-app.herokuapp.com',
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not 
        allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// set api routes
app.use('/', routes);

// catch 404
app.use((req, res, next) => {
  res.json({ message: 'Not found', status: httpStatus.NOT_FOUND });
});

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  const response = {
    code: statusCode,
    message: err.message || httpStatus[err.status],
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
});

module.exports = app;
