const express = require('express');
const enumController = require('../../controllers/v1/enum.controller');

const enumRouter = express.Router();

enumRouter.get('/title', enumController.title);

module.exports = enumRouter;
