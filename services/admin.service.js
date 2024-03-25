const moviemodel = require("../models/movie.model");
const usermodel = require("../models/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { ObjectId } = require("mongoose").Types;

const userlist = async (req, res) => {

    const users = await usermodel.find();
    const response = users.map(user => ({
        name: user.name,
        emailid: user.emailid,
        role: user.role,
        subscriptionid: user.subscriptionid
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

const getMovie = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ID");
    }
    const movie = await moviemodel.findById(id);
    if (!movie) {
        throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");

    }
    const response = { movie: movie };
    return response;

}

const deleteMovie = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ID");
    }
    console.log(id);
    await moviemodel.deleteOne({ id: id });
    const response = { message: "Movie deleted successfully" };
    return response;

}

const updateMovie = async (movieToUpdate, id) => {
    if (!ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ID");
    }
    const movie = await moviemodel.findById(id);
    if (!movie) {
        throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");
    }
    const updatedmovie = await moviemodel.findByIdAndUpdate(id, movieToUpdate, { new: true });
    const response = { data: updatedmovie };
    return response;

}

module.exports = { createMovie, getMovie, deleteMovie, updateMovie, userlist }
