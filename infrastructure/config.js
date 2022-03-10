/* eslint-disable linebreak-style */

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongodb_URL: process.env.mongodb_URL,
};
