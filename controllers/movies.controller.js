// // movies.controller.js
// // const moviesService = require('../services/movies.service');

// const getMovies = async (req, res) => {
//   try {
//     console.log("Request URL:", req.url);
//     const { genres, languages } = req.query;
//     const movies = await moviesService.findMovies(genres, languages);

//   const simplifiedMovies = movies.map(movie => ({
//   title: movie.title,
//   poster: movie.poster,
//   type: movie.type,
//   cast: movie.cast,
//   imdbRating: movie.imdb.rating,
//     plot: {
//       brief: movie.plot,
      
//     full: movie.fullplot
//   },
//   languages: movie.languages,
//   runtimeInMinutes: movie.runtime,
//   releaseYear: movie.year,
//   directors: movie.directors,
// }));

//     res.status(200).json(simplifiedMovies);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching movies', error: error.message });
//   }
// };

// module.exports = {
//   getMovies,
// };
