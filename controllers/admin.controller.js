import catchAsync from "../utils/catchAsync.js";
import {adminService} from "../services/index.js";
import httpStatus from "http-status";

const getUsers = catchAsync(async(req,res) => {
    const{subscription}=req.query; 
    const response = await adminService.getUsers(subscription);
    res.status(httpStatus.OK).json(response);
});

const createMovie = catchAsync(async (req, res) => {
    const data=req.body;
    const response = await adminService.createMovie(data);
    res.send(response);
});
const deleteMovie = catchAsync(async (req, res) => {
    const {id} = req.params;
    const response = await adminService.deleteMovie(id);
    res.status(httpStatus.OK).json(response);
});

const updateMovieStatus = catchAsync(async (req, res) => {    
    const {id} =req.params;
    const response = await adminService.updateMovieStatus(id);
    res.status(httpStatus.OK).json(response);
});

export default { createMovie, deleteMovie, updateMovieStatus, getUsers };