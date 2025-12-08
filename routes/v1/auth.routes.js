const express = require('express');
const authenticate = require('../../middleware/auth/authenticate');
const authController = require('../../controllers/v1/auth.controller');

const authRouter = express.Router();

// secure below endpoints
authRouter.use(authenticate);

authRouter.post('/', authController.logout);

module.exports = authRouter;
