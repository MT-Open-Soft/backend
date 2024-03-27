const moviemodel = require("../models/movie.model");
const usermodel = require("../models/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { ObjectId } = require("mongoose").Types;

const getUsers = async () => {

    const users = await usermodel.find({role: "user"});
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
    const newMovie = new moviemodel({
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
    if (!ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid movie ID");
    }
    console.log(id);
    await moviemodel.deleteOne({ id: id });
    const response = { message: "Movie deleted successfully" };
    return response;

}

const updateMovie = async (movieToUpdate, id) => {
    if (!ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid movie ID");
    }
    const movie = await moviemodel.findById(id);
    if (!movie) {
        throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");
    }
    const updatedmovie = await moviemodel.findByIdAndUpdate(id, movieToUpdate, { new: true });
    const response = { data: updatedmovie };
    return response;

}

module.exports = { createMovie, deleteMovie, updateMovie, getUsers }
