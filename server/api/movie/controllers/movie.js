const service = require('../services/movie');

module.exports = {
  async create(req, res, next) {
    try {
      const { _id } = req.user;
      const movie = await service.create({
        ...req.body,
        createdBy: _id,
        updatedBy: _id,
      });
      return res.json(movie);
    } catch (error) {
      return next(error);
    }
  },
  async find(req, res, next) {
    try {
      const movie = await service.find(req.query);
      return res.json(movie);
    } catch (error) {
      return next(error);
    }
  },
  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await service.findOne({
        _id: id,
      });
      return res.json(movie);
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { _id: userId } = req.user;
      const { id } = req.params;

      const movie = await service.update(
        { _id: id },
        {
          ...req.body,
          updatedBy: userId,
        }
      );
      return res.json(movie);
    } catch (error) {
      return next(error);
    }
  },
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await service.remove({ _id: id });
      return res.json(movie);
    } catch (error) {
      return next(error);
    }
  },
};
