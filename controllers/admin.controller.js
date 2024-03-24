const httpStatus = require('http-status');
const catchAsync = require("../utils/catchAsync");
const authService = require("../services/auth.service");
const adminService = require("../services/admin.service");

const getMovie = catchAsync(async (req, res) => {
    const response = await adminService.getMovie(req, res);
    res.send(response);
});

const createMovie = catchAsync(async (req, res) => {
    const response = await adminService.createMovie(req, res);
    res.send(response);
});
const deleteMovie = catchAsync(async (req, res) => {
    const response = await adminService.deleteMovie(req, res);
    res.send(response);
});

const updateMovie = catchAsync(async (req, res) => {
    const response = await adminService.updateMovie(req, res);
    res.send(response);
});



module.exports = { getMovie, createMovie, deleteMovie, updateMovie };