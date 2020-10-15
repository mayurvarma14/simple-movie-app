const service = require('../services/user');

module.exports = {
  async find() {},
  async register(req, res, next) {
    try {
      const data = await service.create(req.body);
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  },
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await service.login(email, password);
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  },
  async profile(req, res, next) {
    try {
      const data = await service.findOne({ _id: req.user.id });
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  },
  async update() {},
  async remove() {},
};
