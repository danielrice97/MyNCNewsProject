const express = require('express');
const {
    getArticleByID,
    getAllArticles,
    getCommentsForArticle,
    postCommentForArticle,
    patchArticle,
    getsArticleWithCommentCount
} = require('../controllers/articles.controllers.js');

const articlesRouter = express.Router();

articlesRouter.get('/:article_id', getArticleByID);
articlesRouter.get('/', getAllArticles);
articlesRouter.get('/:article_id/comments', getCommentsForArticle);
articlesRouter.post('/:article_id/comments', postCommentForArticle);
articlesRouter.patch('/:article_id', patchArticle);
articlesRouter.get('/:article_id/comment_count', getsArticleWithCommentCount);

module.exports = articlesRouter;