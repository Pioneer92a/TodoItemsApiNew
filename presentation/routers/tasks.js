/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = new express.Router();
const auth = require('../middleware/auth'); // import auth
const taskControllers = require('../controllers/tasks');

// route to Create a task
router.post('/tasks', auth, taskControllers.createNewTask);

// Reading/Requesting the tasks and sorting by date creation :
router.get('/tasks', auth, taskControllers.getAllTasks);

// Operations using the task ID :
router.get('/tasks/:id', auth, taskControllers.getTaskfromId);

// update a task
router.patch('/tasks/:id', auth, taskControllers.updateTask);

// delete a task
router.delete('/tasks/:id', auth, taskControllers.deleteTask);

module.exports = router;
