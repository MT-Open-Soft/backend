const moviemodel = require("../models/movie.model");
const httpstatus = require("http-status");

const createMovie=async (req, res) => {
    try {

        const { title, genres, year } = req.body;
        const newMovie = new moviemodel({
            title,
            type,
            imdb,
            genres,
            runtime,
            cast,
            directors,
            plot,
            fullplot,languages,
            released,
            year
        });
        const createdMovie = await newMovie.save();


        res.status(httpstatus.CREATED).json({ data: createdMovie });
    } catch (error) {
        console.error(error);
        res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}

const getMovie=async (req, res) => {
    const { id } = req.params; // Extracting the ID from the URL path parameters
    try {
        const movie = await moviemodel.findById(id);
        if (!movie) {
            return res.status(httpstatus.NOT_FOUND).json({ message: "Movie not found" });
        }
        res.status(httpstatus.OK).json({ movie: movie });
    } catch (error) {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const deleteMovie=async (req, res) => {
    const { id } = req.params;
    const movie = await moviemodel.findById(id);
    console.log(req.params)
    let data = await movie.deleteOne(req.params);
    res.status(httpstatus.OK).json({ data });

}

const updateMovie= async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await moviemodel.findById(id);
        if (!movie) {
            return res.status(httpstatus.NOT_FOUND).json({ message: 'Movie not found' });
        }
        const movieToUpdate = req.body;
        const updatedmovie = await moviemodel.findByIdAndUpdate(id, movieToUpdate, { new: true });

        res.status(httpstatus.OK).json({ data: updatedmovie });
    } catch (error) {
        console.error(error);
        res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}

module.exports={ createMovie,getMovie,deleteMovie,updateMovie }
