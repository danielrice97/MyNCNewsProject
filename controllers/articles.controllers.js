const fetchArticleById = require('../models/fetchArticleById.models.js')
exports.getArticleByID= async (req,res,next)=>{
    const articleID = Object.values(req.params).toString()
    fetchArticleById(articleID).then((article) => {
    if (article !== undefined) {
    res.status(200).send(article)
    } else {
    res.status(404).send({ status: 404,  msg: "Not found"})
    }
    }).catch((err) => {
        next(err)
    })
}

const fetchAllArticles = require('../models/fetchAllArticles.model.js')

exports.getAllArticles = (req, res, next) => {
    const queryvalue = Object.values(req.query).toString()
    
    const query = Object.keys(req.query).toString()
    
    if (query === "topic"  || !query) {

    fetchAllArticles(queryvalue).then((articles) => {
        res.status(200).send(articles)
    }).catch((err)=> {
        next(err)
    })
    } else {
        next({ status: 400, msg: "Bad Request"})
    }
}

const fetchCommentsForArticle = require('../models/fetchCommentsForArticle.model.js')

exports.getCommentsForArticle = async (req, res, next) => {
    const articleID  = Object.values(req.params).toString()

   fetchArticleById(articleID).then((article) => {
        if (!article) {
            return next({ status: 404, msg: "Not found" });
          }
          return fetchCommentsForArticle(articleID)
    }).then((comments) => {
        res.status(200).send(comments)
    }).catch((err) => {
        return next(err)
    })
    
}

const insertCommentForArticle = require('../models/insertCommentForArticle.model.js')

exports.postCommentForArticle = async (req, res, next) => {
    const articleID  = Object.values(req.params).toString()
    const comment = req.body
    
    const article = await fetchArticleById(articleID)
    
    if (!article) {
        return next({ status: 404, msg: "Not found" });
    }

    insertCommentForArticle(articleID, comment).then((comment) => {
        res.status(201).send(comment)
    }).catch((err) => {
        next(err)
    })


}

const updateArticleVotes = require('../models/updateArticleVotes.model.js')

exports.patchArticle = async (req, res, next) => {
    const inc_votes = req.body.inc_votes
    const {article_id} = req.params
    
    const article = await fetchArticleById(article_id)

    if (!article) {
        return next({ status: 404, msg: "Not found" });
    }

    const current_votes = article.votes
    const new_votes = current_votes + inc_votes

    updateArticleVotes(new_votes, article_id).then((updatedArticle) => {
        res.status(201).send(updatedArticle)
    })
}