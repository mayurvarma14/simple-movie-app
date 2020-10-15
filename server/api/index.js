const express = require('express');
const userRoutes = require('./user/config/routes');
const movieRoutes = require('./movie/config/routes');
const genreRoutes = require('./genre/config/routes');
const userService = require('./user/services/user');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/genres', genreRoutes);

module.exports = { routes: router, user: { service: userService } };
