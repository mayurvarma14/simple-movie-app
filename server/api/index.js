const express = require('express');
const userRoutes = require('./user/config/routes');
const userService = require('./user/services/user');

const router = express.Router();

router.use('/users', userRoutes);

module.exports = { routes: router, user: { service: userService } };
