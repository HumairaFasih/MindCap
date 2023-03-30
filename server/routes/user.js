// Router that handles requests sent to the /api/user route
const express = require('express');
const Appointment = require('../models/appointmentsModel');

// create a router
const router = express.Router();

// router.get()
router.post('/cancelappointment', async (req, res) => {
  const { appointmentid } = req.body;
  try {
    await Appointment.update({ _id: appointmentid }, { status: 'Cancelled' });
    res.send('Success');
  } catch (err) {
    res.send('Failed');
  }
});
// router.delete()
// router.patch()

module.exports = router;
