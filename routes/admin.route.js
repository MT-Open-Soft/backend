import express from "express"

import {adminController} from "../controllers/index.js";

const adminRouter = express.Router();
adminRouter.get("/users", adminController.getUsers);

adminRouter.post("/movies", adminController.createMovie);
adminRouter.delete("/movies/:id",adminController.deleteMovie );
adminRouter.put("/movies/:id",adminController.updateMovieStatus);

export default adminRouter;