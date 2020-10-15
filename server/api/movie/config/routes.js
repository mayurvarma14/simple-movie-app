const express = require('express');
const { validate } = require('express-validation');

const controller = require('../controllers/movie');
const validation = require('./validation');
const { isAuthenticated } = require('../../../middlewares');

const router = express.Router();

router.get('/', controller.find);

router.get('/:id', controller.findOne);

router.post(
  '/',
  isAuthenticated,
  validate(validation.createMovie),
  controller.create
);

router.put(
  '/:id',
  isAuthenticated,
  validate(validation.updateMovie),
  controller.update
);

router.delete('/:id', isAuthenticated, controller.remove);

module.exports = router;
