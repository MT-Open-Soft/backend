const express = require('express');
const routes = require('./routes/search.route');
const app = express();

app.get("/",(req,res)=>{
  res.status(200).json({CTS: "Up and Running"});
})

app.use('/api/movieverse', routes);

module.exports = app;