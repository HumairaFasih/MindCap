const express = require('express');

// enables reading environment variables from .env file
require('dotenv').config();

// logger for debugging purposes, allows viewing request type and status on the console
const logger = require('morgan');

// allows creation of schemas and models
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

/* all routers shall handle a full category of API endpoints related to that functionality (authentication in this case)
helps with code modularity and division of work thus making merging easier */

// connect routers to the main express app
const authenticateRouter = require('./routes/authenticate');
const notificationRouter = require('./routes/notification');
const userRouter = require('./routes/user');

// intilaise express app
const app = express();

// register middleware for parsing requests and logging
app.use(express.json());
app.use(logger('dev'));

// routes
// all requests made to these endpoints (will be made by the frontend application or postman while we test it) will be forwaded to the respective routers
app.use('/api/authenticate', authenticateRouter);
app.use('/api/user', userRouter);
app.use('/api/notification', notificationRouter);

// Connect to database
mongoose
  .connect(process.env.MONGO_CONN_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connection to database successful. Server started on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

// generic test get request
app.get('/', (req, res) => {
  res.send('Hello World from the server!');
});
