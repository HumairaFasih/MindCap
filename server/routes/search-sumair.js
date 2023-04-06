const express = require('express');
const jwtDecode = require('jwt-decode');
const Counselor = require('../models/counselorModel');
const Reviews = require('../models/reviewsModel');
const Availability = require('../models/availabilityModel');
const Student = require('../models/studentModel');

const router = express.Router();

// helper func to tell if day falls in daytype
const isEqual = (day, daytype) => {
  if (daytype === 'Weekday') {
    if (
      day === 'Monday' ||
      day === 'Tuesday' ||
      day === 'Wednesday' ||
      day === 'Thursday' ||
      day === 'Friday'
    ) {
      return true;
    }

    return false;
  }

  if (day === 'Saturday' || day === 'Sunday') {
    return true;
  }

  return false;
};

/*
search and filter is required in these two areas:
    1. search + filter counselors by student
    2. search + filter students & counselors by admin
*/
router.get('/search-counselors', async (req, res) => {
  // get and decode jwt token
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);

  const { usertype } = jwtDecoded;

  // if i am the student
  if (usertype === 'Student') {
    try {
      // use the name from req.body to search for counselors
      const { counselorName } = req.body;
      const name = counselorName.split(' ');
      const firstName = name[0];
      const lastName = name[1];
      const regex = new RegExp(`\\b${firstName}|${lastName}\\b`, 'i');
      const filter = { $or: [{ first_name: regex }, { last_name: regex }] };
      // if there is a filter then use that to filter the search results

      if (req.body.gender) {
        filter.gender = req.body.gender;
      }
      // get all counselors that match either the first name, last name, and gender (if provided)
      const result = await Counselor.find(filter);
      const returnObj = await Promise.all(
        // for each counselor
        // eslint-disable-next-line consistent-return
        result.map(async (item) => {
          // get the reviews of this counselor
          const reviews = await Reviews.find({
            counselor_username: item.username,
          });
          // get the availability of this counselor
          const availability = await Availability.find({
            counselor_username: item.username,
          });
          // if availability is not set as a filter, then just return the object
          if (!req.body.day) {
            return {
              username: item.username,
              name: `${item.first_name} ${item.last_name}`,
              qualification: item.qualification,
              rating: reviews.rating,
            };
          }
          // if availability is a filter, then return only if the day in filter === day_type
          if (isEqual(availability.day_type, req.body.day)) {
            return {
              username: item.username,
              name: `${item.first_name} ${item.last_name}`,
              qualification: item.qualification,
              rating: reviews.rating,
            };
          }
        })
      );
      res.send(returnObj);
    } catch (err) {
      res.send(500).json({ message: err.message });
    }
  }
});

router.get('/search-accounts', async (req, res) => {
  // get and decode jwt token
  const token = req.cookies.jwt;
  const jwtDecoded = jwtDecode(token);

  const { usertype } = jwtDecoded;

  // else if i am admin, then use the name from req.body to search for counselors + students
  // if there is a filter, then use that to filter the results
  if (usertype === 'Admin') {
    try {
      // get the name
      const { givenName } = req.body;
      console.log(givenName);
      const name = givenName.split(' ');
      const firstName = name[0];
      const lastName = name[1];
      const regex = new RegExp(`\\b${firstName}|${lastName}\\b`, 'i');
      const filter = { $or: [{ first_name: regex }, { last_name: regex }] };
      // if account type is provided then:
      if (req.body.accType) {
        const { accType } = req.body;
        console.log(accType);
        // student, so return student's name and rollnumber
        if (accType === 'Student') {
          const results = await Student.find(filter);
          const returnObj = results.map((item) => ({
            name: `${item.first_name} ${item.last_name}`,
            username: item.username,
          }));
          res.send(returnObj);
        } else {
          const results = await Counselor.find(filter);
          const returnObj = await Promise.all(
            results.map(async (item) => {
              // get the reviews of this counselor
              const reviews = await Reviews.find({
                counselor_username: item.username,
              });
              return {
                username: item.username,
                name: `${item.first_name} ${item.last_name}`,
                qualification: item.qualification,
                rating: reviews.rating,
              };
            })
          );
          res.send(returnObj);
        }
      }
      // if account type is not provided then
      else {
        const resultsStudents = await Student.find(filter);
        const returnStudents = resultsStudents.map((item) => ({
          name: `${item.first_name} ${item.last_name}`,
          username: item.username,
        }));
        const resultsCounselors = await Counselor.find(filter);
        const returnCounselors = await Promise.all(
          resultsCounselors.map(async (item) => {
            // get the reviews of this counselor
            const reviews = await Reviews.find({
              counselor_username: item.username,
            });
            return {
              username: item.username,
              name: `${item.first_name} ${item.last_name}`,
              qualification: item.qualification,
              rating: reviews.rating,
            };
          })
        );
        res.send([...returnStudents, ...returnCounselors]);
      }
    } catch (err) {
      res.send(500).json({ message: err.message });
    }
  }
});

module.exports = router;