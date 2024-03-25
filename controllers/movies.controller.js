import httpStatus from 'http-status';
import {moviesService} from '../services/index.js';
import catchAsync from '../utils/catchAsync.js';

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

export default {
  getMovies,
  getMovieById,
};
