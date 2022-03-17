/* eslint-disable linebreak-style */

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongodb_URL: process.env.mongodb_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
