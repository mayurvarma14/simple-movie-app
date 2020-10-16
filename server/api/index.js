const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');

const userRoutes = require('./user/config/routes');
const movieRoutes = require('./movie/config/routes');
const genreRoutes = require('./genre/config/routes');
const userService = require('./user/services/user');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/genres', genreRoutes);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie App',
      version: '0.1.0',
      description: 'Movie App',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
    },
    servers: [
      {
        url: 'http://127.0.0.1:5000',
      },
    ],
  },
  apis: [
    './api/user/models/user.js',
    './api/user/config/routes.js',
    './api/movie/models/movie.js',
    './api/genre/models/genre.js',
  ],
};
const spec = fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);
// const specs = swaggerJsdoc(options);
router.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { explorer: true })
);

module.exports = { routes: router, user: { service: userService } };
