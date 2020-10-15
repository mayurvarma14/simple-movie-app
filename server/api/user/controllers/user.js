const { register, login } = require('../config/validation');

const service = require('../services/user');

module.exports = {
  async find() {},
  async register(req, res, next) {
    try {
      const data = await service.create(req.body);
      res.json(data);
    } catch (error) {
      return next(error);
    }
  },
  async login() {},
  async update() {},
  async remove() {},
};
