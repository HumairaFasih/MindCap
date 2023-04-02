const express = require('express');
const jwtDecode = require('jwt-decode');

const Appointments = require('../models/appointmentsModel');
// const Notifications = require('../models/notificationsModel');

const router = express.Router();

router.get('/view', async (req, res) => {
  // get and decode jwt token
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);

  const { username, usertype } = jwtDecoded;

  // if student is viewing, then return all where student_id === username
  if (usertype === 'Student') {
    try {
      const result = await Appointments.find({ student_id: username });
      res.send(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // else counselor is viewing, then return all where counselor_id === username
  else if (usertype === 'Counselor') {
    try {
      const result = await Appointments.find({ counselor_id: username });
      res.send(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
