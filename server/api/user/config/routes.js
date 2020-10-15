const express = require('express');
const { validate } = require('express-validation');

const controller = require('../controllers/user');
const validation = require('./validation');
const { isAuthenticated } = require('../../../middlewares');

const router = express.Router();

router.post(
  ['/', '/register'],
  validate(validation.register),
  controller.register
);

router.post('/login', validate(validation.login), controller.login);

router.get('/profile', isAuthenticated, controller.profile);

module.exports = router;
