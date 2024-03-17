const {movieModel} = require("../models");

const suggest = async(query) => {
    const searchStage = {
      index: "sample_mflix-movies-static",
      /*weights: {
        title: 10,
        plot: 5,
        fullplot: 2,
        genres: 5,
        cast: 5,
        directors: 5
      },*/
      compound: {
        should: [{
          autocomplete: {
            query,
            path: "title",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3
            }
          }
        },
        {
          autocomplete: {
            query,
            path: "plot",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3
            }
          }
        },
        {
          autocomplete:{
            query,
            path: "fullplot",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3
            }
          }
        },
        {
          autocomplete:{
            query,
            path: "genres",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3
            }
          }
        },
        {
          autocomplete:{
            query,
            path: "cast",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3
            }
          }
        },
        {
          autocomplete:{
            query,
            path: "directors",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3
            }
          }
        }      
        
        

      ],
      }
    }
    const searchResults = await movieModel.aggregate().search(searchStage).limit(10).project("title plot -_id");
    return searchResults;
}

module.exports = {
    suggest
}