const express = require('express');
const cors = require('cors');
const jwtDecode = require('jwt-decode');
// logger for debugging purposes, allows viewing request type and status on the console
const logger = require('morgan');
// const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

// enables reading environment variables from .env file
require('dotenv').config();

// connect routers to the main express app (all routers handle a full category of API endpoints related to that functionality)
const authenticateRouter = require('./routes/authenticate');
const userRouter = require('./routes/user');
const rateRouter = require('./routes/rate');
const adminRouter = require('./routes/admin');
const appointmentRouter = require('./routes/appointment');
const complaintRouter = require('./routes/complaint');

// intilaise express app
const app = express();

// register middleware for parsing requests and logging
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// routes (all requests made to these endpoints will be forwaded to the respective routers)
app.use('/api/authenticate', authenticateRouter);
app.use('/api/user', userRouter);
app.use('/api/rate', rateRouter);
app.use('/api/admin', adminRouter);
app.use('/api/appointment', appointmentRouter);
app.use('/api/complaint', complaintRouter);

app.get('/api/current-user', async (req, res, next) => {
  // get currently logged in user's details using their token

  try {
    const token = req.cookies.jwt;
    console.log('Logging the token:', token);
    const jwtDecoded = jwtDecode(token);
    res.send({ usertype: jwtDecoded.usertype, username: jwtDecoded.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

module.exports = app;
