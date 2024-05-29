const express = require('express')
const app = express()
const {getAllTopicsData}= require('./controllers/topics.controller.js')
const {getAllEndPointsInfo}= require('./controllers/endpoints.controller.js')
const {getArticleByID, getAllArticles, getCommentsForArticle, postCommentForArticle}= require('./controllers/articles.controllers.js')
app.use(express.json())

app.get('/api/topics', getAllTopicsData)
app.get('/api', getAllEndPointsInfo)
app.get('/api/articles/:article_id', getArticleByID)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id/comments', getCommentsForArticle)
app.post('/api/articles/:article_id/comments', postCommentForArticle)

app.use((err, req, res, next) => {

    if (err.msg && err.status) {
        res.status(err.status).send(err)
    } else {
        next(err)
    }
})

module.exports = app