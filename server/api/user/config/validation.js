const { Joi } = require('express-validation');
const roles = require('./roles');

module.exports = {
  register: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(20),
      name: Joi.string().required(),
      role: Joi.string().valid(...roles),
    }),
  },

  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().max(20),
    }),
  },
};
