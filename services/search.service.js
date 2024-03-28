import {Movie} from "../models/index.js";

const getSuggestions = async(query) => {
    const searchStage = {
      index: "sample_mflix_search_index",
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
    const searchResults = await Movie
      .aggregate()
      .search(searchStage)
      .limit(5)
      .project("title type plot poster year imdb.rating cast _id premium");

    const response = searchResults.map(result => {
    const { _id, title, poster, year, type, imdb: {rating}, premium } = result;
    return {
      _id,
      title,
      poster,
      rating,
      year,
      type,
      premium
    }
  })

  return response;
}

const getSearchResults = async(query) => {
  const searchStage = {
    index: "sample_mflix_search_index",
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

  const searchResults = await Movie
    .aggregate()
    .search(searchStage)
    .limit(50)
    .project(
      {
        poster:1,
        title :1,
        "imdb.rating" :1,
        _id:1, 
        year:1,
        runtime:1,
        type:1, 
        genres:1,
        premium:1
      });

  const response = searchResults.map(result => {
    const { _id, title, poster,year, runtime: runtimeInMinutes, imdb: {rating}, type, genres, premium } = result;
    return {
      _id,
      title,
      poster,
      rating,
      year, 
      runtimeInMinutes,
      type,
      genres,
      premium
    }
  })
  return response;
}

export default { 
  getSuggestions,
  getSearchResults 
};
