import express from "express"
import routes from "./routes/index.js";

import { errorHandler, errorConverter } from './middleware/error.js'

const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
  res.status(200).json({CTS: "Up and Running"});
})

app.use('/api/v1', routes);
app.use(errorConverter);
app.use(errorHandler);

export default app;