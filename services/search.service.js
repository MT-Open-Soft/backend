import {Movie} from "../models/index.js";
import getAggregationPipeline from "../utils/hybrid-search-pipeline.js"

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
      .project("title type plot poster_path year imdb.rating cast _id premium");

    const response = searchResults.map(result => {
    const { _id, title, poster, year, type, imdb: {rating}, premium, poster_path } = result;
    return {
      _id,
      title,
      poster,
      rating,
      year,
      type,
      premium,
      poster: poster_path
    }
  })

  return response;
}

const getSearchResults = async(query) => {
  
  const pipeline = await getAggregationPipeline(query);
  const searchResults = await Movie
    .aggregate(pipeline);
 
  const response = searchResults.map(result => {
    let {title, poster, _id, year, runtime: runtimeInMinutes, type, highlights, rating, cast, directors, premium } = result;
    highlights = new Set(highlights);

    return {
      _id,
      title,
      poster,
      rating,
      year,
      runtimeInMinutes,
      type,
      highlights: [...highlights],
      cast,
      directors,
      premium
    }
  })
  return response;
}

export default { 
  getSuggestions,
  getSearchResults 
};
