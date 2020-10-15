const Movie = require('../models/movie');

module.exports = {
  async create(data) {
    const movie = await Movie.create(data);
    return movie.populate('genre').execPopulate();
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
  async remove(condition) {
    return Movie.findOneAndRemove(condition).populate('genre');
  },
};
