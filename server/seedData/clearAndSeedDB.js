/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const data = require('./db.json');
const database = require('../config/database');
const Movie = require('../api/movie/models/movie');
const Genre = require('../api/genre/models/genre');
const User = require('../api/user/models/user');

async function createGenres(userId) {
  let genres = new Set();
  data.forEach((movie) => movie.genre.forEach((item) => genres.add(item.trim())));
  const genreObject = {};
  genres = Array.from(genres).map((genre) => ({
    title: genre,
    createdBy: userId,
    updatedBy: userId,
  }));
  const promises = genres.map(async (genre) => {
    const genreRecord = await Genre.create(genre);
    genreObject[genre.title] = genreRecord._id;
  });
  await Promise.all(promises);
  return genreObject;
}

async function createUser() {
  return User.create({
    email: 'test@test.com',
    password: 'test@123',
    name: 'test',
  });
}

async function createMovies() {
  const user = await createUser();
  console.log('Created user');
  const genres = await createGenres(user._id);
  console.log('Created genres');
  const promises = data.map((movie) =>
    Movie.create({
    name: movie.name,
    imdbScore: movie.imdb_score,
    director: movie.director,
    popularity: movie['99popularity'],
    genre: movie.genre.map((item) => genres[item.trim()]),
    createdBy: user._id,
    updatedBy: user._id,
  })
  );
  await Promise.all(promises);
}

(async () => {
  try {
    const mongoose = await database.connect();
    console.log('Remove existing data...');
    await mongoose.connection.db.dropDatabase();
    console.log('Done removing existing data');
    await createMovies();
    console.log('Created movies');
    console.log('Done seeding database');
    process.exit(0);
  } catch (error) {
    console.error(error);
  }
})();
