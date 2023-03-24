const express = require('express');
const jwtDecode = require('jwt-decode');
const Student = require('../models/studentModel');
const Counselor = require('../models/counselorModel');
const Availability = require('../models/availabilityModel');

// create a router
const router = express.Router();

router.post('/updateprofile', async (req, res) => {
  // access and decode token
  const token = req.cookies.jwt;
  console.log(token);
  const jwtDecoded = jwtDecode(token);

  // get id and usertype from the decoded token
  const { id } = jwtDecoded;
  const { usertype } = jwtDecoded;
  const { username } = jwtDecoded;

  // if student, then update student profile, else update counselor profile
  if (usertype === 'Student') {
    try {
      // get student data and update the record
      const { newfirstname, newlastname, newdob, newgender } = req.body;

      await Student.update(
        { _id: id },
        {
          first_name: newfirstname,
          last_name: newlastname,
          dob: newdob,
          gender: newgender,
        }
      );
      res.send('Success');
    } catch (error) {
      res.send(error);
    }
  } else if (usertype === 'Counselor') {
    try {
      // get counselor data and update the record
      const {
        newfirstname,
        newlastname,
        newdob,
        newexperience,
        newqualification,
        newbio,
        newgender,
        newdaytype,
        newtime,
        newmeridian,
      } = req.body;
      await Counselor.update(
        { _id: id },
        {
          first_name: newfirstname,
          last_name: newlastname,
          date_of_birth: newdob,
          gender: newgender,
          bio: newbio,
          qualification: newqualification,
          experience: newexperience,
        }
      );
      // update counselor availibility
      const newslot = newtime + newmeridian;
      await Availability.update(
        { counselor_username: username },
        {
          day_type: newdaytype,
          time: newslot,
        }
      );
      res.send('Success');
    } catch (error) {
      res.send(error);
    }
  }
});

module.exports = router;
