const express = require('express');
const authenticate = require('../../middleware/auth/authenticate');
const authorize = require('../../middleware/auth/authorize');
const userController = require('../../controllers/v1/user.controller');

const validator = require('../../middleware/requestValidator');
const userRegisterSchema = require('../../schemas/v1/user/userRegister.schema');
const userLoginSchema = require('../../schemas/v1/user/userLogin.schema');

const userRouter = express.Router();

userRouter.post('/', validator(userRegisterSchema), userController.register);
userRouter.post('/login', validator(userLoginSchema), userController.login);

// secure below endpoints
userRouter.use(authenticate);

userRouter.get('/', userController.get);
userRouter.delete('/', userController.delete);

module.exports = userRouter;
