const express = require('express')
const app = express()
const {getAllTopicsData}= require('./controllers/topics.controller.js')
const {getAllEndPointsInfo}= require('./controllers/endpoints.controller.js')
app.use(express.json())

app.get('/api/topics', getAllTopicsData)
app.get('/api', getAllEndPointsInfo)

app.use((err, req, res, next) => {
    if (err.msg && err.status) {
        res.status(err.status).send(err)
    } else {
        
    }
})

module.exports = app
