const express = require('express');
const routesV1 = express.Router();

const userRouter = require('./user.routes');
const enumRouter = require('./enum.routes');
const authRouter = require('./auth.routes');

routesV1.use('/user', userRouter);
routesV1.use('/enum', enumRouter);
routesV1.use('/auth', authRouter);

module.exports = routesV1;
