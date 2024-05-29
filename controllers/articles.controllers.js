const fetchArticleById = require('../models/fetchArticleById.models.js')
exports.getArticleByID= async (req,res,next)=>{
    const articleID = Object.values(req.params).toString()
    fetchArticleById(articleID).then((article) => {
    if (article !== undefined) {
    res.status(200).send(article)
    } else {
    res.status(404).send({ status: 404,  msg: "Not found"})
    }
    }).catch(() => {
        next({status: 400, msg: "Bad Request"})
    })
}

const fetchAllArticles = require('../models/fetchAllArticles.model.js')

exports.getAllArticles = (req, res, next) => {
    fetchAllArticles().then((articles) => {
        res.status(200).send(articles)

    })
}

const fetchCommentsForArticle = require('../models/fetchCommentsForArticle.model.js')

exports.getCommentsForArticle = async (req, res, next) => {
    const articleID  = Object.values(req.params).toString()
    
   fetchArticleById(articleID).then((article) => {
        if (!article) {
            return next({ status: 404, msg: "Not found" });
          }
          return fetchCommentsForArticle(articleID)
    }).catch(() => {
        return next({status: 400, msg: "Bad Request"})
    }).then((comments) => {
        res.status(200).send(comments)
    }).catch(() => {
        return next({status: 400, msg: "Bad Request"})
    })
    
}