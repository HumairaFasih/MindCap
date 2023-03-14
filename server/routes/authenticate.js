// Router that handles requests sent to the /api/authenticate route

const express = require('express');
const Counselor = require('../models/counselorModel');
const router = express.Router();

router.get('/', (req, res) => {
  const admin = new Counselor.Counselor({username: 'sumair', email: '24100004@lums.edu.pk', password: 'bruh', first_name: 's', last_name: 'i', date_of_birth: new Date(), gender: 'Male', bio: 'im awxum', qualification: '1 paper publishedd', experience: 'netsec worst course'});
  admin.save().then(() => {
    console.log("it work")
    res.send(admin);
  })
  .catch((e) => {
    res.status(400).send(e);
  }); 

});

module.exports = router;
