const express = require('express');
const { validate } = require('express-validation');

const controller = require('../controllers/user');

const validation = require('./validation');

const router = express.Router();

router.post('/', validate(validation.register), controller.register);
router.post('/login', validate(validation.login), controller.login);

module.exports = router;
