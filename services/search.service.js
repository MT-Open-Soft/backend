const {movieModel} = require("../models");

const getSuggestions = async(query) => {
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
              fuzzy: {
                maxEdits: 1
              },
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
      .project("title type plot poster year imdb.rating cast -_id");
    return searchResults;
}

const getSearchResults = async(query) => {
  const searchStage = {
    index: "sample_mflix-movies-static",
    compound: {
      should: [
        {
          text: {
            query,
            path: "title",
            fuzzy : {
              maxEdits : 1,
              maxExpansions : 50
            },
            score: {
              boost: {
                value: 9
              }
            }
          }
        },
        {
          autocomplete: {
            query,
            path: "title",
          }
        },
        {
          text:{
            query,
            path: "genres",
            score: {
              boost: {
                value: 4
              }
            }
          }
        },
        {
          text:{
            query,
            path: "cast",
            fuzzy : {
              maxEdits : 1,
              maxExpansions : 50
            },
            score: {
              boost: {
                value: 7
              }
            }
          }
        },
        {
          text:{
            query,
            path: "directors",
            fuzzy : {
              maxEdits : 1,
              maxExpansions : 50
            },
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
    .limit(50)
    .project(
      {
        poster:1,
        title :1,
        "imdb.rating" :1,
        _id:0, 
        year:1,
        runtime:1, 
        plot:1,
        type:1, 
        genres:1,
      });
  return searchResults;
}

module.exports = {
    getSuggestions, getSearchResults
}