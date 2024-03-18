const {movieModel} = require("../models");

const suggest = async(query) => {
    const searchStage = {
      index: "sample_mflix-movies-static",
      compound: {
        should: [
          {
            autocomplete: {
              query,
              path: "title",
              tokenOrder: "sequential",
              score: {
                boost: {
                  value: 7
                }
              }
            }
          },
          {
            autocomplete: {
              query,
              path: "plot",
              tokenOrder: "sequential",
              score: {
                boost: {
                  value: 3
                }
              }
            }
          },
          {
            autocomplete:{
              query,
              path: "genres",
              score: {
                boost: {
                  value: 3
                }
              }
            }
          },
          {
            autocomplete:{
              query,
              path: "cast",
              tokenOrder: "sequential",
              score: {
                boost: {
                  value: 3
                }
              }
            }
          },
          {
            autocomplete:{
              query,
              path: "directors",
              tokenOrder: "sequential",
              score: {
                boost: {
                  value: 2
                }
              }
            }
          }
        ]
      }
    }
    const searchResults = await movieModel
      .aggregate()
      .search(searchStage)
      .limit(5)
      .project("title type poster year imdb.rating -_id");
    return searchResults;
}

module.exports = {
    suggest
}