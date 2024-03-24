// movies.service.js
const Movie = require('../models/movie.model');

const findMovies = async (genres, languages,page = 1, pageSize = 10) => {
  const query = {};
  
  if (genres) {
    query.genres = { $in: genres.split(',') };
  }

  if (languages) {
    query.languages = { $in: languages.split(',') };
  }
  
    for (const key of Object.keys(query)) {
    query[key] = { $regex: new RegExp(query[key].$in.join('|'), 'i') };
  }
  
  const movies = await Movie.find(query).select({
    _id: 1,
    title: 1,
    poster: 1,
    type: 1,
    cast: 1,
    'imdb.rating': 1,
    fullplot: 1,
    languages: 1,
    runtime: 1,
    year: 1,
    directors: 1,
  })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
   const total = await Movie.countDocuments(query);

  const renamedMovies = movies.map(movie => ({
    _id: movie._id,
    title: movie.title,
    poster: movie.poster,
    type: movie.type,
    cast: movie.cast,
    languages: movie.languages,
    runtimeInMinutes: movie.runtime,
    releaseYear: movie.year,
    directors: movie.directors,
    imdbRating: movie.imdb.rating
  }));



  return {
    movies: renamedMovies,
    TotalPages: Math.ceil(total / pageSize),
    CurrentPage: Number(page)
  };
};

const getMovieById = async (id) => {
  const movie = await Movie.findById(id).select({
    _id: 1,
    title: 1,
    poster: 1,
    type: 1,
    cast: 1,
    'imdb.rating': 1,
    plot: 1,
    fullplot: 1,
    languages: 1,
    runtime: 1,
    year: 1,
    directors: 1,
  });
  
  if (movie === null) {
    throw new Error('Movie not found');
  }

  
  return {
    _id: movie._id,
    title: movie.title,
    poster: movie.poster,
    type: movie.type,
    cast: movie.cast,
    Plot: movie.fullplot,
    languages: movie.languages,
    runtimeInMinutes: movie.runtime,
    releaseYear: movie.year,
    directors: movie.directors,
    imdbRating: movie.imdb.rating
  };
};

module.exports = {
  findMovies,
  getMovieById,
};
