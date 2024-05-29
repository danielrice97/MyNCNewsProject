const removeComment = require('../models/removeComment.model.js')

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