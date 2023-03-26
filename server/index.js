const express = require('express');

const cors = require('cors');

// enables reading environment variables from .env file
require('dotenv').config();

// logger for debugging purposes, allows viewing request type and status on the console
const logger = require('morgan');

// allows creation of schemas and models
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');

/* all routers shall handle a full category of API endpoints related to that functionality (authentication in this case)
helps with code modularity and division of work thus making merging easier */

// connect routers to the main express app
const authenticateRouter = require('./routes/authenticate');
<<<<<<< HEAD
const rateRouter = require('./routes/rate');
=======
// const notificationRouter = require('./routes/notification');
// const userRouter = require('./routes/user');
>>>>>>> origin/UpdateCounselor
const profileRouter = require('./routes/profile');

// intilaise express app
const app = express();

// register middleware for parsing requests and logging
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// routes
// all requests made to these endpoints (will be made by the frontend application or postman while we test it) will be forwaded to the respective routers
app.use('/api/authenticate', authenticateRouter);
app.use('/api/profile', profileRouter);
app.use('/api/rate', rateRouter);

// Connect to database
mongoose
  .connect(process.env.MONGO_CONN_URI, { dbName: 'mindcap' })
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
