const express = require('express')
const app = express()
const {getAllTopicsData}= require('./controllers/topics.controller.js')
const {getAllEndPointsInfo}= require('./controllers/endpoints.controller.js')
const {getArticleByID, getAllArticles, getCommentsForArticle, postCommentForArticle, patchArticle, getsArticleWithCommentCount}= require('./controllers/articles.controllers.js')
const {deleteComment, patchComment}= require('./controllers/comments.controller.js')
const {getUsers} = require('./controllers/users.controller.js')
const cors = require('cors');

app.use(cors());
app.use(express.json())

app.get('/api/topics', getAllTopicsData)
app.get('/api', getAllEndPointsInfo)
app.get('/api/articles/:article_id', getArticleByID)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id/comments', getCommentsForArticle)
app.post('/api/articles/:article_id/comments', postCommentForArticle)
app.patch('/api/articles/:article_id', patchArticle)
app.delete('/api/comments/:comment_id', deleteComment)
app.get('/api/users', getUsers)
app.get('/api/articles/:article_id/comment_count', getsArticleWithCommentCount)
app.patch('api/comments/:comment_id', patchComment)

app.use((err, req, res, next) => {

    if (err.msg && err.status) {
        res.status(err.status).send(err)
    } else {
        next(err)
    }
})

module.exports = app
