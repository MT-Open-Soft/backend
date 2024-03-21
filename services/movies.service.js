// movies.service.js
const Movie = require('../models/movie.model');

const findMovies = async (genres, languages) => {
  const query = {};
  
  if (genres) {
    query.genres = { $in: genres.split(',') };
  }

  if (languages) {
    query.languages = { $in: languages.split(',') };
  }
  
  const movies = await Movie.find(query);

  const simplifiedMovies = movies.map(movie => ({
    title: movie.title,
    poster: movie.poster,
    type: movie.type,
    cast: movie.cast,
    imdbRating: movie.imdb.rating, 
    plot: {
      brief: movie.plot,
      full: movie.fullplot
    },
    languages: movie.languages,
    runtimeInMinutes: movie.runtime,
    releaseYear: movie.year,
    directors: movie.directors,
  }));

  return simplifiedMovies;
};

const getMovieById = async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    throw new Error('Movie not found');
  }

  const simplifiedMovie = {
    title: movie.title,
    poster: movie.poster,
    type: movie.type,
    cast: movie.cast,
    imdbRating: movie.imdb.rating,
    plot: {
      brief: movie.plot,
      full: movie.fullplot
    },
    languages: movie.languages,
    runtimeInMinutes: movie.runtime,
    releaseYear: movie.year,
    directors: movie.directors,
  };

  return simplifiedMovie;
};

module.exports = {
  findMovies,
  getMovieById,
};
