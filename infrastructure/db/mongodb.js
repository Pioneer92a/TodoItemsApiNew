/* eslint-disable linebreak-style */
// this is our mongoose database file
const mongoose = require('mongoose');
const { mongodb_URL } = require('../config');

mongoose.connect(mongodb_URL, {
// mongoose.connect('mongodb://127.0.0.1:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('connected to Database');
  })
  .catch((err) => {
    console.log(`error connecting to database: ${err}`);
  });
