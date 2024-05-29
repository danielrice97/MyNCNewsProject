const fetchAllEndPointsInfo = require('../models/fetchAllEndPointsInfo.model.js')

exports.getAllEndPointsInfo = async (req, res, next) => {
       const endpoints = await fetchAllEndPointsInfo();
       res.status(200).send(endpoints);
};