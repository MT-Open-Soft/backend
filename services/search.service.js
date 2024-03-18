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

const getSearchResults = async(query) => {
  const searchStage = {
    index: "sample-mflix-search",
    compound: {
      should: [
        {
          autocomplete: {
            query,
            path: "title",
            fuzzy : {
              maxEdits : 2,
              maxExpansions : 50
            },
            tokenOrder: "sequential", //any
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
            fuzzy : {
              maxEdits : 2,
              maxExpansions : 50
            },
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
            fuzzy : {
              maxEdits : 2,
              maxExpansions : 50
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
            path: "cast",
            fuzzy : {
              maxEdits : 2,
              maxExpansions : 50
            },
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
            fuzzy : {
              maxEdits : 2,
              maxExpansions : 50
            },
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
    .limit(20)
    .project("title plot type poster runtime genres year imdb.rating -_id");
  return searchResults;
}

module.exports = {
    getSuggestions, getSearchResults
}