import httpStatus from 'http-status';
import {moviesService} from '../services/index.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.model.js';

const getMovies = catchAsync(async (req, res) => {
  const { genres, languages, page, pageSize } = req.query;
  const result = await moviesService.findMovies(genres, languages, page, pageSize);
  res.status(httpStatus.OK).json(result);
});

const getMovieById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const movie = await moviesService.getMovieById(id);

    const response = movie;
    res.status(httpStatus.OK).json(response);
});

const getTopRatedMovies = catchAsync(async (req, res) => {
    const {type, number} = req.query;
    if(!type) throw new ApiError(httpStatus.BAD_REQUEST, "Missing type: movie or series");
    const results = await moviesService.getTopRated(type, number);
    res.status(httpStatus.OK).json(results);
})

export default {
  getMovies,
  getMovieById,
  getTopRatedMovies
};
