/* eslint-disable linebreak-style */

const express = require('express');

const router = new express.Router();

const auth = require('../middleware/auth'); // import auth
const userControllers = require('../controllers/user');

// route for Creating a new user
router.post('/users', userControllers.createNewUser);

// user login route
router.post('/users/login', userControllers.userLogin);

// user logout route
router.post('/users/logout', auth, userControllers.userLogout);

// all users logout route
router.post('/users/logoutAll', auth, userControllers.AllUsersLogout);

// Routes for Read, Update, and Delete operations on user profie
router.get('/users/me', auth, userControllers.getUserDetails);

router.patch('/users/me', auth, userControllers.updateUser);

router.delete('/users/me', auth, userControllers.deleteUser);

module.exports = router;
