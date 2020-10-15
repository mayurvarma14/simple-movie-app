const { Joi } = require('express-validation');

module.exports = {
  createGenre: {
    body: Joi.object({
      title: Joi.string().required(),
    }),
  },
  updateGenre: {
    body: Joi.object({
      title: Joi.string(),
    }),
  },
};
