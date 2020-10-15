const service = require('../services/genre');

module.exports = {
  async create(req, res, next) {
    try {
      const { _id } = req.user;
      const genre = await service.create({
        ...req.body,
        createdBy: _id,
        updatedBy: _id,
      });
      return res.json(genre);
    } catch (error) {
      return next(error);
    }
  },
  async find(req, res, next) {
    try {
      const genre = await service.find();
      return res.json(genre);
    } catch (error) {
      return next(error);
    }
  },
  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const genre = await service.findOne({
        _id: id,
      });
      return res.json(genre);
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { _id: userId } = req.user;
      const { id } = req.params;

      const genre = await service.update(
        { _id: id },
        {
          ...req.body,
          updatedBy: userId,
        }
      );
      return res.json(genre);
    } catch (error) {
      return next(error);
    }
  },
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const genre = await service.remove({ _id: id });
      return res.json(genre);
    } catch (error) {
      return next(error);
    }
  },
};
