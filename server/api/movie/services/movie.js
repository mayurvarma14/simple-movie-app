const Movie = require('../models/movie');

module.exports = {
  async create(data) {
    const movie = await Movie.create(data);
    return movie.populate('genre').execPopulate();
  },
  async find({ query, sortBy, sortOrder, limit = 100, page }) {
    const condition = {};
    let sort = {};
    let skip;
    // eslint-disable-next-line no-param-reassign
    limit = Number(limit);
    page = Number(page);
    if (query) condition.$text = { $search: query };
    if (sortBy) sort = { [sortBy]: sortOrder || 'asc' };
    // eslint-disable-next-line no-param-reassign
    if (limit > 100) limit = 100;
    if (page) skip = (page - 1) * limit;

    return Movie.find(condition)
      .populate('genre')
      .sort(sort)
      .limit(limit)
      .skip(skip);
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
