const express = require('express');
const routes = require('./routes');
const { errorHandler, errorConverter } = require('./middleware/error');
const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
  res.status(200).json({CTS: "Up and Running"});
})

app.use('/api/v1', routes);
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;