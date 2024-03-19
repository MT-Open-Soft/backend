const express = require('express');
const routes = require('./routes/search.route');
const moviesRoutes = require('./routes/movies.route');
const app = express();

app.get("/",(req,res)=>{
  res.status(200).json({CTS: "Up and Running"});
})

app.use('/api/movieverse', routes);
app.use('/api/movieverse', moviesRoutes);

module.exports = app;