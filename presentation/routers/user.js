/* eslint-disable linebreak-style */

const express = require('express');

const router = new express.Router();

const User = require('../../domain/user'); // import user model
const auth = require('../middleware/auth'); // import auth

// route for Creating a new user
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// user login route
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password,
    );
    const token = await user.generateAuthToken();
    res.send({
      user,
      token,
    });
  } catch (e) {
    res.status(400).send({
      error: 'Catch error',
      e,
    });
  }
});

// user logout route
router.post('/users/logout', auth, async (req, res) => {
  try {
    // remove the 'logged in token' from the token array
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save(); // save the updated user (with logged in token removed)
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

// all users logout route
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

// Routes for Read, Update, and Delete operations on user profie
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(401).send({ error: 'Invalid updates' });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(201).send(req.user);
  } catch (e) {
    res.status(404).send({
      e,
    });
  }
});
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send({ e: 'Catch Error', e });
  }
});

module.exports = router;
