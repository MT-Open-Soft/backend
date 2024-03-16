const {movieModel} = require("../models");

const suggest = async(query) => {
    const searchStage = {
      index: "sample_mflix-movies-static",
      compound: {
        must: [{
          autocomplete: {
            query,
            path: "title"
          }
        },
        {
          autocomplete: {
            query,
            path: "plot"
          }
        }],
      }
    }
    const searchResults = await movieModel.aggregate().search(searchStage).limit(10).project("title plot -_id");
    return searchResults;
}

module.exports = {
    suggest
}