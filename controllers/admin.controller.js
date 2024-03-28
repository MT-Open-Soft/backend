import catchAsync from "../utils/catchAsync.js";
import {adminService} from "../services/index.js";
import httpStatus from "http-status";

const getUsers = catchAsync(async(req,res) => {
    const response = await adminService.getUsers(req,res);
    res.status(httpStatus.OK).json(response);
});

const createMovie = catchAsync(async (req, res) => {
    const data=req.body;
    const response = await adminService.createMovie(data);
    res.send(response);
});
const deleteMovie = catchAsync(async (req, res) => {
    const response = await adminService.deleteMovie(id);
    res.send(response);
});

const updateMovie = catchAsync(async (req, res) => {
    const movieToUpdate =req.body;
    const {id} =req.params;
    const response = await adminService.updateMovie(movieToUpdate,id);
    res.send(response);
});

export default { createMovie, deleteMovie, updateMovie, getUsers };