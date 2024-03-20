// movies.service.js
const Movie = require('../models/movie.model');

const findMovies = async (genres, languages) => {
  const query = {};
  console.log("Movie count:", await Movie.countDocuments()); 
  if (genres) {
    query.genres = { $in: genres.split(',') };
  }

  if (languages) {
    query.languages = { $in: languages.split(',') };
  }
  console.log("Query:", query);
  
  return Movie.find(query);
};

const getMovies = async (req, res) => {
  try {
    console.log("Request URL:", req.url);
    const { genres, languages } = req.query;
    const movies = await findMovies(genres, languages);

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

    res.status(200).json(simplifiedMovies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
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
    res.json(simplifiedMovie);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error fetching movie', error: error.message });
  }
};


module.exports = {
  getMovies,getMovieById,
};
