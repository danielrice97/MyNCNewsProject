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

exports.getAllArticles = async (req, res, next) => {
    const { topic, sortby: sort_by, order } = req.query;

    const validQueries = ['topic', 'sortby', 'order'];
    const queryKeys = Object.keys(req.query);

    // Check if all provided query keys are valid
    const isValidQuery = queryKeys.every(key => validQueries.includes(key));

    if (isValidQuery) {
        try {
            let articles = await fetchAllArticles({ topic, sort_by, order });
            
            // Fetch comments for each article to get the comment count
            articles = await Promise.all(articles.map(async article => {
                const comments = await fetchCommentsForArticle(article.id); // Assuming each article has an 'id' property
                article.comment_count = comments.length;
                return article;
            }));
            
            res.status(200).send({ articles });
        } catch (err) {
            next(err);
        }
    } else {
        next({ status: 400, msg: "Bad Request" });
    }
};
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

exports.getsArticleWithCommentCount = async (req,res,next)=>{
    const articleID = Object.values(req.params).toString()
    fetchArticleById(articleID).then( async (article) => {
    if (article !== undefined) {

       const comments = await fetchCommentsForArticle(articleID)
       const comment_count = comments.length
       article.comment_count = comment_count
       res.status(200).send(article)

    } else {
    res.status(404).send({ status: 404,  msg: "Not found"})
    }
    }).catch((err) => {
        next(err)
    })
}
