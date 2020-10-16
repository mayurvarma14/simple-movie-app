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

// const spec = fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8');
// const swaggerDoc = jsyaml.safeLoad(spec);

router.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(require('../config/documentation.json'), { explorer: true })
);

module.exports = { routes: router, user: { service: userService } };
