import {Movie, User} from "../models/index.js"
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js"
import { Types } from "mongoose"

const getUsers = async () => {

    const users = await User.find({role: "user"});
    const response = users.map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription
    }));
    return response;

}
const createMovie = async (data) => {
    const { title, type, imdb, genres, runtime, cast, directors, plot, fullplot, languages, released, year } = data;
    const newMovie = new Movie({
        title,
        type,
        imdb,
        genres,
        runtime,
        cast,
        directors,
        plot,
        fullplot, languages,
        released,
        year
    });
    const createdMovie = await newMovie.save();
    const response = { data: createdMovie };
    return response;

}

const deleteMovie = async (id) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid movie ID");
    }
    console.log(id);
    await Movie.deleteOne({ id: id });
    const response = { message: "Movie deleted successfully" };
    return response;

}

const updateMovieStatus = async (id) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid movie ID");
    }
    const movie = await Movie.findById(id);
    if (!movie) {
        throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");
    }
    const updatedmovie = await Movie.findByIdAndUpdate(id, { premium: !movie.premium }, { new: true});
    const response = { state: updatedmovie.premium};
    return response;

}

export default { createMovie, deleteMovie, updateMovieStatus, getUsers }
