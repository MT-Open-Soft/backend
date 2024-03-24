const httpStatus = require('http-status');
const moviesService = require('../services/movies.service');
const catchAsync = require('../utils/catchAsync');

const getMovies = catchAsync(async (req, res) => {
  const { genres, languages, page, pageSize } = req.query;
  const result = await moviesService.findMovies(genres, languages, page, pageSize);
  res.status(httpStatus.OK).json(result);
});

const getMovieById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const movie = await moviesService.getMovieById(id);
    res.status(httpStatus.OK).json(movie);
});

module.exports = {
  getMovies,getMovieById,
};
