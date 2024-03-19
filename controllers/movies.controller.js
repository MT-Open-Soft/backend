// movies.controller.js
const moviesService = require('../services/movies.service');

const getMovies = async (req, res) => {
  try {
    console.log("Request URL:", req.url);
    const { genres, languages } = req.query;
    const movies = await moviesService.findMovies(genres, languages);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error: error.message });
  }
};

module.exports = {
  getMovies,
};
