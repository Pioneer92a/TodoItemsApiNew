/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

const Task = require('../../domain/task'); // import task model

async function createNewTask(req, res) {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(200).send(`Task saved: ${task}`);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function getAllTasks(req, res) {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }
  try {
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit, 10),
          skip: parseInt(req.query.skip, 10),
          sort,
        },
      });
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getTaskfromId(req, res) {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(401).send({ error: 'Task id not found' });
    }
    return res.send(task);
  } catch (e) {
    return res.status(400).send(e);
  }
}

async function updateTask(req, res) {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['Task', 'completed'];
  // check the validity
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(401).send({ error: 'Invalid updates' });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.send({ error: 'Task id not found to update' });
    }
    updates.forEach((update) => { task[update] = req.body[update]; });
    await task.save();
    return res.send(task);
  } catch (e) {
    return res.status(400).send(e);
  }
}

async function deleteTask(req, res) {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status404.send({ error: 'Task id not found' });
    }
    res.send(task);
  } catch (err) {
    res.status(500).send({ e: 'Catch Error', err });
  }
}

// export an object containing all taskController functions
module.exports = {
  createNewTask, getAllTasks, getTaskfromId, updateTask, deleteTask,
};
