const express = require('express');
const routesV1 = express.Router();

const userRouter = require('./user.routes');
const enumRouter = require('./enum.routes');

routesV1.use('/user', userRouter);
routesV1.use('/enum', enumRouter);

module.exports = routesV1;
