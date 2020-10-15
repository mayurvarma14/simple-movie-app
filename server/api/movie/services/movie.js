const httpStatus = require('http-status');

const Movie = require('../models/movie');
const Genre = require('../../genre/models/genre');
const APIError = require('../../../utils/APIError');

module.exports = {
  async create(data) {
    return Movie.create(data);
  },
  async find(data) {
    return Movie.find(data).populate('genre');
  },
  async findOne(data) {
    return Movie.findOne(data).populate('genre');
  },
  async update(condition, data) {
    return Movie.findOneAndUpdate(condition, data, { new: true }).populate(
      'genre'
    );
  },
  async remove() {},
};
