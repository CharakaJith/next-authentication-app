const express = require('express');
const authenticate = require('../../middleware/auth/authenticate');
const authorize = require('../../middleware/auth/authorize');
const userController = require('../../controllers/v1/user.controller');

const validator = require('../../middleware/requestValidator');
const userRegisterSchema = require('../../schemas/v1/user/userRegister.schema');

const userRouter = express.Router();

userRouter.post('/', validator(userRegisterSchema), userController.register);

// secure below endpoints
userRouter.use(authenticate);

module.exports = userRouter;
