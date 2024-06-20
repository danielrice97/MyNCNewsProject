const fetchComment = require('../models/fetchComment.js')
const removeComment = require('../models/removeComment.model.js')
const updateCommentVotes = require('../models/updateCommentVotes.model.js')

exports.deleteComment = (req,res,next)=>{
    const {comment_id} = req.params

    removeComment(comment_id).then((deltedComment) => {
        if (deltedComment !== undefined) {
        res.status(204).send()
        } else {
        next({ status : 404, msg: "Not Found"})
        }
    }).catch((err) => {
        next(err)
    })

}

exports.patchComment = async (req, res, next) => {
    const inc_votes = req.body.inc_votes
    const {comment_id} = req.params
    
    const comment = await fetchComment(comment_id)

    if (!comment) {
        return next({ status: 404, msg: "Not found" });
    }

    const current_votes = comment.votes
    const new_votes = current_votes + inc_votes

    updateCommentVotes(new_votes, comment_id).then((updatedComment) => {
        res.status(201).send(updatedArticle)
    })
}

exports.getComment = async (req, res, next) => {
    const {comment_id} = req.params
    
    const comment = await fetchComment(comment_id)

    if (!comment) {
        return next({ status: 404, msg: "Not found" });
    }

    res.status(201).send(comment)
}
