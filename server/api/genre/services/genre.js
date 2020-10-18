const Genre = require('../models/genre');

module.exports = {
  async create(data) {
    return Genre.create(data);
  },
  async find(data) {
    return Genre.find(data).sort({ title: 'asc' });
  },
  async findOne(data) {
    return Genre.findOne(data);
  },
  async update(condition, data) {
    return Genre.findOneAndUpdate(condition, data, { new: true });
  },
  async remove(condition) {
    return Genre.findOneAndRemove(condition);
  },
};
