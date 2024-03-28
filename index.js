import mongoose from 'mongoose';
import { MONGO_URI, PORT } from './utils/config.js';
import app from './app.js';

let server;
mongoose.connect(MONGO_URI)
        .then(()=>{
          console.log("Connected to MongoDB database")
          server = app.listen(PORT, ()=>{
            console.log(`Server listening on ${PORT}`)
          });
        })

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});

export default app;