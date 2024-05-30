const express = require('express');
const { getUsers } = require('../controllers/users.controller.js');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);

module.exports = usersRouter;