const express = require('express');
const jwtDecode = require('jwt-decode');
const Student = require('../models/studentModel');
const Counselor = require('../models/counselorModel');
const Availability = require('../models/availabilityModel');
const Reviews = require('../models/reviewsModel');

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
  }
});

router.get('/viewprofile', async (req, res) => {
  // access and decode token
  const token = req.cookies.jwt;
  console.log(token);
  const jwtDecoded = jwtDecode(token);

  // get id and usertype from the decoded token
  const { id } = jwtDecoded;
  const { usertype } = jwtDecoded;
  const { username } = jwtDecoded;

  if (usertype === 'Student') {
    // javeria's usecase - view my profile for student
  }

  else if (usertype === 'Counselor') {
    try {
      const counselor = await Counselor.getdetails({ _id: id });
      console.log(counselor);
      let availability = await Availability.getdetails({
        counselor_username: username,
      });
      if (availability === null) {
        availability = { day_type: '', time: '' };
      }
      const reviews = await Reviews.getdetails({
        counselor_username: username,
      });
      const returnObj = {
        name: `${counselor.first_name} ${counselor.last_name}`,
        qualification: counselor.qualification,
        username: counselor.username,
        gender: counselor.gender,
        experience: counselor.experience,
        bio: counselor.bio,
        availabilityday: availability.day_type,
        availabilitytime: availability.time,
        revs: [...reviews],
      }
      res.send(returnObj);
    }
    catch (err) {
      res.send(err);
    }
  }
});

router.get('/users/:username', async (req, res) => {
  // access and decode token
  // const token = req.cookies.jwt;
  // console.log(token);
  // const jwtDecoded = jwtDecode(token);
  // console.log(jwtDecoded);

  // // if user type is student and searchUsername is not empty, then search for counselor profile with that username
  const { username } = req.params;

  // // javeria's usecase - view counselor profile for student
  try {
    const counselor = await Counselor.getdetails({ username });
    let availability = await Availability.getdetails({ counselor_username: username });
    if (availability === null) {
      availability = { day_type: '', time: '' };
    }
    const reviews = await Reviews.getdetails({ counselor_username: username });
    const returnObj = {
      name: `${counselor.first_name} ${counselor.last_name}`,
      qualification: counselor.qualification,
      username: counselor.username,
      gender: counselor.gender,
      experience: counselor.experience,
      bio: counselor.bio,
      availabilityday: availability.day_type,
      availabilitytime: availability.time,
      revs: [...reviews],
    }
    res.send(returnObj);
  } catch (err) {
    res.send(err);
  }
  

});


module.exports = router;
