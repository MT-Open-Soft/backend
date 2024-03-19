// movies.service.js
const Movie = require('../models/movie.model'); // Assuming you have a Movie model defined

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

module.exports = {
  findMovies,
};
