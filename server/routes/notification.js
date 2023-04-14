const express = require('express');
const jwtDecode = require('jwt-decode');
const Notification = require('../models/notificationsModel');

const router = express.Router();

router.get('/view', async (req, res) => {
  // get and decode jwt token
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);

  const { username } = jwtDecoded;
  try {
    const result = await Notification.find({ username });
    res.send(result);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
})

module.exports = router;
