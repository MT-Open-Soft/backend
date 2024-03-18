const { searchService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const suggest = catchAsync(async(req,res) => {
    const {query} = req.query;
    
    const response = await searchService.getSuggestions(query);
    res.send(response);
})

module.exports = {
    suggest,
};