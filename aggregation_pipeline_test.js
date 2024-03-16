const pipeline = [
  {
    $search: {
      index: "sample_mflix-movies-static",
      compound: {
        must: [{
          autocomplete: {
            query: "pri",
            path: "title"
          }
        },
        {
          autocomplete: {
            query: "pri",
            path: "plot"
          }
        }],
        // "minimumShouldMatch": 1
      }
    }
  },
  {
    $limit: 5
  },
  {
    $project: {
      _id: 0,
      title: 1,
      plot: 1
    }
  }
]

module.exports = pipeline;