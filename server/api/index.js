const express = require('express');
const userRoutes = require('./user/config/routes');
const movieRoutes = require('./movie/config/routes');
const userService = require('./user/services/user');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

module.exports = { routes: router, user: { service: userService } };
