import { searchService } from "../services/index.js"
import catchAsync from "../utils/catchAsync.js"

const suggest = catchAsync(async(req,res) => {
    const {query} = req.query;
    const response = await searchService.getSuggestions(query);
    res.status(200).json(response);
})

const search = catchAsync(async(req,res) => {
    const {query} = req.query;
    const response = await searchService.getSearchResults(query);
    res.status(200).json(response);
})

export default {
    suggest,
    search
}