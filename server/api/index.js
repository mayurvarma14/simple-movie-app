const express = require('express');
const userRoutes = require('./user/config/routes');

const router = express.Router();

router.use('/users', userRoutes);

module.exports = { routes: router };
