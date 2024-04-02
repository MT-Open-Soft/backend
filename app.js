import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler, errorConverter } from './middleware/error.js';

const app = express();
let corsOptions = {
  origin: ["http://localhost:3000", "https://shik-shak-show.tech", "https://www.shik-shak-show.tech"],
}
app.use(cors(corsOptions));
app.get("/",(req,res)=>{
  res.status(200).json({CTS: "Up and Running"});
})

app.use(express.json());
app.use('/api/v1', routes);
app.use(errorConverter);
app.use(errorHandler);

export default app;