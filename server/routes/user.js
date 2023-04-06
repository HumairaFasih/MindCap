const express = require('express');
const jwtDecode = require('jwt-decode');
const multer = require('multer');
const Student = require('../models/studentModel');
const Counselor = require('../models/counselorModel');
const Availability = require('../models/availabilityModel');
const Reviews = require('../models/reviewsModel');
const MedicalRecord = require('../models/medicalModel');

const router = express.Router();
const upload = multer();

// go over each review and add the rating to the total
const getRating = (reviews) => {
  let total = 0;
  for (let i = 0; i < reviews.length; i += 1) {
    total += reviews[i].rating;
  }
  const rating = total / reviews.length;
  return rating;
};

// view counselor profile
router.get('/counselor/:username', async (req, res) => {
  const { username } = req.params;
  console.log(username);

  try {
    const counselor = await Counselor.getDetails({ username });
    console.log('Printing counselor object', counselor);
    let availability = await Availability.getDetails({
      counselor_username: username,
    });
    if (availability === null) {
      availability = { day_type: '', time: '' };
    }
    const reviews = await Reviews.getDetails({
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
      rating: getRating(reviews),
      status: counselor.status,
      revs: [...reviews],
    };
    // console.log(returnObj);
    res.send(returnObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// view student profile
router.get('/student/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const student = await Student.getDetails({ username });
    console.log('Printing student object', student);

    const medicalFile = await MedicalRecord.getDetails({ username });
    console.log('user ki medical file', medicalFile.filename);

    const returnObj = {
      fname: student.first_name,
      lname: student.last_name,
      roll_num: student.username,
      gender: student.gender,
      dob: student.date_of_birth.toLocaleDateString('en-US'),
      email: student.email,
      status: student.status,
      med_filename: medicalFile.filename,
    };
    console.log(returnObj);
    res.send(returnObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get counselor data and update the record
router.post('/counselor/edit-profile', async (req, res) => {
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);

  // get id and usertype from the decoded token
  const { id, username } = jwtDecoded;

  try {
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
    res.send('Success!');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/student/edit-profile', upload.single('pdf'), async (req, res) => {
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);
  const { id, username } = jwtDecoded;

  try {
    const { newfirstname, newlastname, newdob, newgender } = req.body;
    const dateFinal = new Date(new Date(newdob).getTime() + 300 * 60000);
    await Student.update(
      { _id: id },
      {
        first_name: newfirstname,
        last_name: newlastname,
        date_of_birth: dateFinal,
        gender: newgender,
      }
    );
    if (req.file != null) {
      const {
        originalname: filename,
        buffer: data,
        mimetype: contentType,
      } = req.file;

      await MedicalRecord.findOneAndUpdate(
        { username },
        {
          username,
          filename,
          data,
          contentType,
        },
        {
          new: true,
          upsert: true,
        }
      );
    }

    // sets status to 200
    res.send('Edited profile successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
