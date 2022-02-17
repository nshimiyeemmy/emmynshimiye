const express = require('express');
const router = express.Router();

const {
    registerUser,
    getAllUsers,
    getUserDetails,
    loginUser,
    userCount,
    deleteUser
  } = require('../controllers/usersAuthController');

  router.route('/users/register').post(registerUser);
  router.route('/admin/users').get(getAllUsers);
  router.route('/admin/users/:id').get(getUserDetails);
  router.route('/users/login').post(loginUser);
  router.route('/admin/users/count').get(userCount);
  router.route('/admin/users/:id').delete(deleteUser);



  module.exports = router;