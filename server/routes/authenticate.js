// Router that handles requests sent to the /api/authenticate route

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ dummyResponse: 'response from authenticate router' });
});

module.exports = router;
