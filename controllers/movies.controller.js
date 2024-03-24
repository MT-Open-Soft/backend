const moviesService = require('../services/movies.service');

const getMovies = async (req, res) => {
  try {
    const { genres, languages, page, pageSize } = req.query;
    
    const result = await moviesService.findMovies(genres, languages, page, pageSize);
    
    res.status(200).json(result);
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
