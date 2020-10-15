const { Joi } = require('express-validation');

module.exports = {
  createMovie: {
    body: Joi.object({
      name: Joi.string().required(),
      imdbScore: Joi.number().required(),
      genre: Joi.array().items(Joi.string().required()).required(),
      director: Joi.string().required(),
      popularity: Joi.number().required(),
    }),
  },
  updateMovie: {
    body: Joi.object({
      name: Joi.string(),
      imdbScore: Joi.number(),
      genre: Joi.array().items(
        Joi.object({
          _id: Joi.string(),
        })
      ),
      director: Joi.string(),
      popularity: Joi.number(),
    }),
  },
};
