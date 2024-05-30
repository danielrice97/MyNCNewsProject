const express = require('express');
const app = express();
const topicsRouter = require('./routes/topics.router.js');
const articlesRouter = require('./routes/articles.router.js');
const commentsRouter = require('./routes/comments.router.js');
const usersRouter = require('./routes/users.router.js');
const { getAllEndPointsInfo } = require('./controllers/endpoints.controller.js');

app.use(express.json());

app.get('/api', getAllEndPointsInfo);
app.use('/api/topics', topicsRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);

app.use((err, req, res, next) => {
    if (err.msg && err.status) {
        res.status(err.status).send(err);
    } else {
        next(err);
    }
});

module.exports = app;