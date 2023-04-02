const express = require('express');
const Appointments = require('../models/appointmentsModel');

const router = express.Router();

router.post('/cancel-appointment', async (req, res) => {
  const { appointmentId } = req.body;
  try {
    await Appointments.update({ _id: appointmentId }, { status: 'Cancelled' });
    res.send('Success');
  } catch (err) {
    res.send('Failed');
  }
});

module.exports = router;
