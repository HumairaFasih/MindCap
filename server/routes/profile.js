const express = require('express');
const jwtDecode = require('jwt-decode');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const Student = require('../models/studentModel');
const Counselor = require('../models/counselorModel');
const Availability = require('../models/availabilityModel');
const Reviews = require('../models/reviewsModel');
const MedicalRecord = require('../models/medicalModel');

const upload = multer()
// create a router
const router = express.Router();

router.post('/updateprofile', upload.single('pdf'), async (req, res) => {
  // access and decode token
  const token = req.cookies.jwt;
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
      if (req.file != null) {
        await MedicalRecord.create({
          student_username: username,
          data: req.file.buffer,
          contentType: req.file.mimetype,
        });
      }
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

router.get('/viewprofile', async (req, res) => {
  // access and decode token
  const token = req.cookies.jwt;
  console.log(token);
  const jwtDecoded = jwtDecode(token);

  // get id and usertype from the decoded token
  const { id } = jwtDecoded;
  const { usertype } = jwtDecoded;
  const { username } = jwtDecoded;

  if(usertype === 'Student') {
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
      };

      res.send(returnObj);
    } catch (err) {
      res.send(err);
    }
  }
});

router.get('/users/:username', async (req, res) => {
  // access and decode token
  const token = req.cookies.jwt;
  console.log(token);
  const jwtDecoded = jwtDecode(token);
  console.log(jwtDecoded);
  const { usertype } = jwtDecoded;

  // // if user type is student and searchUsername is not empty, then search for counselor profile with that username
  const { username } = req.params;
  if (usertype === 'Student') {
    // javeria's usecase - view my profile for student
    try {
      const counselor = await Counselor.getdetails({ username });
      let availability = await Availability.getdetails({
        counselor_username: username,
      });
      if (availability === null) {
        availability = { day_type: '', time: '' };
      }
      const reviews = await Reviews.getdetails({
        counselor_username: username,
      });
      // go over each review and add the rating to the total
      let total = 0;
      for (let i = 0; i < reviews.length; i += 1) {
        total += reviews[i].rating;
      }
      const rating = total / reviews.length;
      console.log(rating);
      const returnObj = {
        name: `${counselor.first_name} ${counselor.last_name}`,
        qualification: counselor.qualification,
        username: counselor.username,
        gender: counselor.gender,
        experience: counselor.experience,
        bio: counselor.bio,
        availabilityday: availability.day_type,
        availabilitytime: availability.time,
        rating,
        revs: [...reviews],
      };
      res.send(returnObj);
    } catch (err) {
      res.send(err);
    }
  }
});

module.exports = router;
