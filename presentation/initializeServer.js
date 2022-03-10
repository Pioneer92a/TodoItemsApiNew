/* eslint-disable linebreak-style */

// create and initialize server (aka app)

const express = require('express');

// import routers
const userRouter = require('./routers/user'); // import user router
const taskRouter = require('./routers/tasks'); // import tasks router

/* Defining app to be an express app and the port to use */
const app = express();

// import port configuration
const { port } = require('../infrastructure/config');

app.use(express.json());

// define app routers
app.use(userRouter);
app.use(taskRouter);

// start the server/app
app.listen(port, () => { console.log(`Server is up at ${port}`); });
