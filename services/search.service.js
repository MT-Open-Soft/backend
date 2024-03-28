import {Movie} from "../models/index.js";
import {pipeline} from "@xenova/transformers";

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
      .project("title type plot poster year imdb.rating cast _id");
    return searchResults;
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

  let vector_penalty = 5;
  let full_text_penalty = 1;
  const generateEmbeddings = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  const output = await generateEmbeddings(query, { pooling: "mean", normalize: true });
  const agg = [
    {
      "$vectorSearch": {
        "index": "vector_index",
        "path": "plot_embeddings",
        "queryVector": Array.from(output.data.values()),
        "numCandidates": 100,
        "limit": 20
      }
    }, {
      "$group": {
        "_id": null,
        "docs": {"$push": "$$ROOT"}
      }
    }, {
      "$unwind": {
        "path": "$docs", 
        "includeArrayIndex": "rank"
      }
    }, {
      "$addFields": {
        "vs_score": {
          "$divide": [1.0, {"$add": ["$rank", vector_penalty, 1]}]
        }
      }
    }, {
      "$project": {
        "vs_score": 1, 
        "_id": "$docs._id", 
        "title": "$docs.title",
        "plot": "$docs.fullplot",
        "poster": "$docs.poster",
      }
    },
    {
      "$unionWith": {
        "coll": "new_embedded_movies",
        "pipeline": [
          {
            "$search": searchStage
          }, {
            "$limit": 20
          }, {
            "$group": {
              "_id": null,
              "docs": {"$push": "$$ROOT"}
            }
          }, {
            "$unwind": {
              "path": "$docs", 
              "includeArrayIndex": "rank"
            }
          }, {
            "$addFields": {
              "fts_score": {
                "$divide": [
                  1.0,
                  {"$add": ["$rank", full_text_penalty, 1]}
                ]
              }
            }
          },
          {
            "$project": {
              "fts_score": 1,
              "_id": "$docs._id",
              "title": "$docs.title",
              "plot": "$docs.fullplot",
              "poster": "$docs.poster",
            }
          }
        ]
      }
    },
    {
      "$group": {
        "_id": "$_id",
        "vs_score": {"$max": "$vs_score"},
        "fts_score": {"$max": "$fts_score"},
        "plot": {"$first": "$plot"},
        "title": {"$first": "$title"},
        "poster": {"$first": "$poster"}
      }
    },
    {
      "$project": {
        "_id": 1,
        "plot": 1,
        title: 1,
        poster: 1,
        "vs_score": {"$ifNull": ["$vs_score", 0]},
        "fts_score": {"$ifNull": ["$fts_score", 0]}
      }
    },
    {
      "$project": {
        "score": {"$add": ["$fts_score", "$vs_score"]},
        "_id": 1,
        "plot": 1,
        title: 1,
        poster: 1,
        "vs_score": 1,
        "fts_score": 1
      }
    },
    {"$sort": {"score": -1}},
    {"$limit": 50}
  ];
  
  const searchResults = await Movie
    .aggregate(agg);
 
  const response = searchResults.map(result => {
    const {title, poster, _id, year, runtime: runtimeInMinutes, type, plot, vs_score, fts_score, score } = result;
    return {
      _id,
      title, 
      poster,
      //rating: result.imdb.rating,
      year, 
      plot,
      vs_score,
      fts_score,
      score,
      runtimeInMinutes,
      type,
    }
  })
  return response;
}

export default { 
  getSuggestions,
  getSearchResults 
};