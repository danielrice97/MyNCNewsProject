const fetchAllTopics = require('../models/fetchAllTopics.model.js')

exports.getAllTopicsData = async (req,res,next)=>{
    return fetchAllTopics().then((topics) => {
        return res.status(200).send(topics)
    })
}