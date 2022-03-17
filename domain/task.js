/* eslint-disable linebreak-style */

// TASK MODEL
// in this file, we define our task model

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  Task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema); // attach the schema to the user model
module.exports = Task;
