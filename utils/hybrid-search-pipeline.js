import {pipeline} from "@xenova/transformers";

export default async function (query) {

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
        },
        "highlight": {
          "path": ["title", "cast", "genres", "directors"], 
          "maxCharsToExamine": 500, 
          "maxNumPassages": 3
        }
      }

    let vector_penalty;
    let full_text_penalty;
  
  const words = query.split(" ");
  const wordCount = words.length;
  
  const only_fts_pipeline = [
    {
      "$search": searchStage
    }, {
      "$limit": 20
    },{
      "$project": {
        "_id": 1,
        "title": 1,
        "poster": "$poster_path",
        "year": 1,
        "runtime": 1,
        "type": 1,
        "rating": "$imdb.rating",
        "cast": 1,
        "directors": 1,
        "premium": 1,
        "highlight": {$meta: "searchHighlights"}
      }
    },
    {
      "$project": {
        "_id": 1,
        "title": 1,
        "poster": 1,
        "year": 1,
        "runtime": 1,
        "type": 1,
        "rating": 1,
        "cast": 1,
        "directors": 1,
        "premium": 1,
        "highlights": "$highlight.path"
      }
    }
  ];

  const generateEmbeddings = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  const output = await generateEmbeddings(query, { pooling: "mean", normalize: true });

  const only_vs_pipeline = [
    {
      "$vectorSearch": {
        "index": "vector_index",
        "path": "plot_embeddings",
        "queryVector": Array.from(output.data.values()),
        "numCandidates": 100,
        "limit": 20
      }
    }, {
      "$project": {
        "vs_score": 1, 
        "_id": 1, 
        "title": 1,
        "plot": 1,
        "poster": "$poster_path",
        "year": 1,
        "runtime": 1,
        "type": 1,
        "cast": 1,
        "directors": 1,
        "rating": "$imdb.rating",
        "premium": 1,
        "highlights": ["plot"]
      }
    }
]

  if(wordCount>8) {
    return only_vs_pipeline
  } else if (wordCount>2) {
    vector_penalty = 3;
    full_text_penalty = 1;
  } else return only_fts_pipeline;

  const combined_search_pipeline = [
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
        "poster": "$docs.poster_path",
        "year": "$docs.year",
        "runtime": "$docs.runtime",
        "type": "$docs.type",
        "cast": "$docs.cast",
        "directors": "$docs.directors",
        "premium": "$docs.premium",
        "rating": "$docs.imdb.rating",
      }
    }, {
      "$unionWith": {
        "coll": "new_embedded_movies",
        "pipeline": [
          {
            "$search": searchStage
          }, {
            "$limit": 20
          }, {
            "$project": {
              "doc": {
                "$mergeObjects": ["$$ROOT", {"highlight": {$meta: "searchHighlights"}}]
              },
            }
          },{
            "$group": {
              "_id": null,
              "docs": {"$push": "$doc"}
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
              "poster": "$docs.poster_path",
              "year": "$docs.year",
              "runtime": "$docs.runtime",
              "type": "$docs.type",
              "rating": "$docs.imdb.rating",
              "cast": "$docs.cast",
              "directors": "$docs.directors",
              "premium": "$docs.premium",
              "highlight": "$docs.highlight.path"
            }
          }
        ]
      }
    }, {
      "$group": {
        "_id": "$_id",
        "vs_score": {"$max": "$vs_score"},
        "fts_score": {"$max": "$fts_score"},
        "plot": {"$first": "$plot"},
        "title": {"$first": "$title"},
        "poster": {"$first": "$poster"},
        "year": {"$first": "$year"},
        "runtime": {"$first": "$runtime"},
        "type": {"$first": "$type"},
        "rating": {"$first": "$rating"},
        "cast": {"$first": "$cast"},
        "premium": {"$first": "$premium"},
        "directors": {"$first": "$directors"},
        "highlights": {"$max": "$highlight"}
      }
    }, {
      "$project": {
        "_id": 1,
        "plot": 1,
        "title": 1,
        "poster": 1,
        "year": 1,
        "runtime": 1,
        "type": 1,
        "rating": 1,
        "premium": 1,
        cast:1,
        directors:1,
        "vs_score": {"$ifNull": ["$vs_score", 0]},
        "fts_score": {"$ifNull": ["$fts_score", 0]},
        "highlights": {"$ifNull": ["$highlights", ["plot"]]}
      }
    }, {
      "$project": {
        "score": {"$add": ["$fts_score", "$vs_score"]},
        "_id": 1,
        "plot": 1,
        "title": 1,
        "poster": 1,
        "year": 1,
        "runtime": 1,
        "vs_score": 1,
        "fts_score": 1,
        "type": 1,
        "rating": 1,
        cast:1,
        directors:1,
        premium:1,
        "highlights": 1
      }
    },
    {"$sort": {"score": -1}},
    {"$limit": 40}
  ];

  return combined_search_pipeline;
}