const express = require('express');
// middlewares
const encode = require('../../../middleware/jwt');

const router = express.Router();

router.post('/login/:userId', encode, (req, res) => {
    return res.status(200).json({
        success: true,
        authorization: req.authToken,
      });
  });

module.exports = router;
