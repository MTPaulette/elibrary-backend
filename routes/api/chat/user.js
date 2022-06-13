const express = require('express');
// controllers
const user = require('../../../controllers/chat/user');

const router = express.Router();

router
  .get('/', user.onGetAllUsers)
  .post('/', user.onCreateUser)
  .get('/:id', user.onGetUserById)
  .delete('/:id', user.onDeleteUserById)

  module.exports = router;
