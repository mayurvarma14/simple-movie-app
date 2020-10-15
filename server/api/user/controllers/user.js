const service = require('../services/user');

module.exports = {
  async find() {},
  async register(req, res, next) {
    try {
      const user = await service.create(req.body);
      return res.json(user);
    } catch (error) {
      return next(error);
    }
  },
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await service.login(email, password);
      return res.json(user);
    } catch (error) {
      return next(error);
    }
  },
  async profile(req, res, next) {
    try {
      const user = await service.findOne({ _id: req.user.id });
      return res.json(user);
    } catch (error) {
      return next(error);
    }
  },
  async update() {},
  async remove() {},
};
