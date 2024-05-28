const fetchAllTopics = require('../models/fetchAllTopics.model.js')

exports.getAllTopicsData = (req,res,next)=>{
    return fetchAllTopics().then((topics) => {
        return res.status(200).send(topics)
    })
}