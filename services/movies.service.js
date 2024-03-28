import httpStatus from 'http-status';
import {Movie} from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import { Types } from "mongoose";

const findMovies = async (genres, languages,page = 1, pageSize = 10) => {
  const query = {};
  
  if (genres) {
    query.genres = { $in: genres.split(',') };
  }

  if (languages) {
    query.languages = { $in: languages.split(',') };
  }
  
  for (const key of Object.keys(query)) {
    query[key] = { $regex: new RegExp(query[key].$in.join('|'), 'i') };
  }
  
  const movies = await Movie.find(query).select({
    _id: 1,
    title: 1,
    poster_path: 1,
    backdrop_path: 1,
    type: 1,
    cast: 1,
    'imdb.rating': 1,
    fullplot: 1,
    languages: 1,
    runtime: 1,
    year: 1,
    directors: 1,
    premium: 1
  })
    .skip((page - 1) * pageSize)
    .limit(pageSize).lean();

  const total = await Movie.countDocuments(query);

  const renamedMovies = movies.map(movie => ({
    _id: movie._id,
    title: movie.title,
    poster: movie.poster_path,
    thumbnail: movie.backdrop_path,
    type: movie.type,
    cast: movie.cast,
    languages: movie.languages,
    runtimeInMinutes: movie.runtime,
    releaseYear: movie.year,
    directors: movie.directors,
    imdbRating: movie.imdb.rating,
    premium: movie.premium
  }));

  return {
    movies: renamedMovies,
    totalPages: Math.ceil(total / pageSize),
    currentPage: Number(page)
  };
};

const getMovieById = async (id) => {

  if(!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid user ID");
  }

  const movie = await Movie.findById(id).select({
    _id: 1,
    title: 1,
    poster_path: 1,
    backdrop_path: 1,
    type: 1,
    cast: 1,
    'imdb.rating': 1,
    plot: 1,
    fullplot: 1,
    languages: 1,
    runtime: 1,
    year: 1,
    directors: 1,
    genres: 1,
    premium: 1,
  }).lean();
  
  if (movie === null) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');
  }
  
  return {
    _id: movie._id,
    title: movie.title,
    poster: movie.poster_path,
    thumbnail: movie.backdrop_path,
    type: movie.type,
    cast: movie.cast,
    plot: movie.fullplot,
    languages: movie.languages,
    runtimeInMinutes: movie.runtime,
    releaseYear: movie.year,
    directors: movie.directors,
    imdbRating: movie.imdb.rating,
    genres: movie.genres
  };
};

const getTopRated = async(type, number = 10) => {

  let results = await Movie.find({type, "imdb.rating": {$ne: null}}).select("title runtime year imdb.rating premium poster_path backdrop_path").sort({ 'imdb.rating': -1 }).limit(Number(number)).lean();
  results = results.map(result => ({
    _id: result._id,
    title: result.title,
    poster: result.poster_path,
    thumbnail: result.backdrop_path,
    runtimeInMinutes: result.runtime,
    releaseYear: result.year,
    imdbRating: result.imdb.rating,
    premium: result.premium
  }));

  return results;
}

export default {
  findMovies,
  getMovieById,
  getTopRated
};
