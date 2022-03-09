/* eslint-disable linebreak-style */
// this is our mongoose database file
const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URL, {
mongoose.connect('mongodb://127.0.0.1:27017/todoapp', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('connected to Database');
  });
