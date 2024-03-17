const Movie = require("../models/movie.model");
const { searchService } = require("../services");

const searchController = async(req,res) => {
    const {query} = req.query;
    

    const response = await searchService.suggest(query);
    res.send(response);
}

module.exports = searchController;