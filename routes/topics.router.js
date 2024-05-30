const express = require('express');
const { getAllTopicsData } = require('../controllers/topics.controller.js');

const topicsRouter = express.Router();

topicsRouter.get('/', getAllTopicsData);

module.exports = topicsRouter;