const { searchService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const suggestController = catchAsync(async(req,res) => {
    const {query} = req.query;
    

    const response = await searchService.suggest(query);
    res.send(response);
})

const searchController = catchAsync(async (req,res) => {
    const {query} = req.query;

    const response = await searchService.search(query);
    res.send(response);
})

module.exports = {
    suggestController,
    searchController,
};