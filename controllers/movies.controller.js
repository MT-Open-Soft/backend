const moviesService = require('../services/movies.service');

const getMovies = async (req, res) => {
  try {
    console.log("Request URL:", req.url);
    const { genres, languages } = req.query;
    
    const movies = await moviesService.findMovies(genres, languages);
    
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: 'Error fetching movies', error: error.message });
  }
};
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await moviesService.getMovieById(id);
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie by id:", error); 
    res.status(500).json({ message: 'Error fetching movie by id', error: error.message });
  }
}

module.exports = {
  getMovies,getMovieById,
};
