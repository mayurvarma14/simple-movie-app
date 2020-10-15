const express = require('express');
const { validate } = require('express-validation');

const controller = require('../controllers/genre');
const validation = require('./validation');
const { isAuthenticated } = require('../../../middlewares');

const router = express.Router();

router.get('/', controller.find);

router.get('/:id', controller.findOne);

router.post(
  '/',
  isAuthenticated,
  validate(validation.createGenre),
  controller.create
);

router.put(
  '/:id',
  isAuthenticated,
  validate(validation.updateGenre),
  controller.update
);

router.delete('/:id', isAuthenticated, controller.remove);

module.exports = router;
