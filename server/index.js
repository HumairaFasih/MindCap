const express = require('express');
const cors = require('cors');
// logger for debugging purposes, allows viewing request type and status on the console
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// enables reading environment variables from .env file
require('dotenv').config();

// connect routers to the main express app (all routers handle a full category of API endpoints related to that functionality)
const authenticateRouter = require('./routes/authenticate');
const profileRouter = require('./routes/profile');
const userRouter = require('./routes/user');
const rateRouter = require('./routes/rate');
const adminRouter = require('./routes/admin');
const appointmentRouter = require('./routes/appointment');

// intilaise express app
const app = express();

// register middleware for parsing requests and logging
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// routes (all requests made to these endpoints will be forwaded to the respective routers)
app.use('/api/authenticate', authenticateRouter);
app.use('/api/profile', profileRouter);
app.use('/api/user', userRouter);
app.use('/api/rate', rateRouter);
app.use('/api/admin', adminRouter);
app.use('/api/appointment', appointmentRouter);

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
