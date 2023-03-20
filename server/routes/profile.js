const express = require('express');
const jwtDecode = require('jwt-decode');
const Student = require('../models/studentModel');

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
        const {
          newfirstname,
          newlastname,
          newdob,
          newgender,
        } = req.body;

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
  

module.exports = router;
