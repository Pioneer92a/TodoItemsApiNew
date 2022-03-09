/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

const User = require('../../domain/user'); // import user model

async function createNewUser(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
}

async function userLogin(req, res) {
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
}

async function userLogout(req, res) {
  try {
    // remove the 'logged in token' from the token array
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save(); // save the updated user (with logged in token removed)
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
}

async function AllUsersLogout(req, res) {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
}

async function getUserDetails(req, res) {
  res.send(req.user);
}

async function updateUser(req, res) {
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
}

async function deleteUser(req, res) {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send({ e: 'Catch Error', e });
  }
}

module.exports = {
  createNewUser, userLogin, userLogout, AllUsersLogout, getUserDetails, updateUser, deleteUser,
};
