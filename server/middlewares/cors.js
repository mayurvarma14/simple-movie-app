const cors = require('cors');

const allowedOrigins = [
  'http://127.0.0.1:5000',
  'https://simple-movie-app.herokuapp.com',
];

module.exports = cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not 
          allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
});
