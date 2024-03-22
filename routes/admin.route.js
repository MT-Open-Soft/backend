const express= require("express");
const adminRouter= express.Router();
const moviemodel=require("../models/movie.model");


adminRouter.post("/", async (req, res) => {
    try {
       
        const { title, genres, year } = req.body;

        
        const newMovie = new moviemodel({
            title,
            genres,
            year
        });

        
        const createdMovie = await newMovie.save();

        
        res.status(201).json({ data: createdMovie });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
adminRouter.get("/:id", async (req, res) => {
    const { id } = req.params; // Extracting the ID from the URL path parameters
    try {
        const movie = await moviemodel.findById(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ movie:movie });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
adminRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const movie = await moviemodel.findById(id);
    console.log(req.params)
    let data = await movie.deleteOne(req.params);
    res.status(200).json({ data });

});  
adminRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await moviemodel.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        
        const movieToUpdate = req.body;

        
        const updatedmovie = await moviemodel.findByIdAndUpdate(id, movieToUpdate, { new: true });

        res.status(200).json({ data: updatedmovie });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = adminRouter;