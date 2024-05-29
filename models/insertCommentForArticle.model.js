const db = require('../db/connection.js')

function insertCommentForArticle(articleID, comment) {
   return db.query(`INSERT INTO comments (author, body, article_id) Values ($1, $2, $3) RETURNING *`, [comment.username, comment.body, articleID]).then(({ rows }) => {
        return rows
        }).catch(()=> {
        return Promise.reject( {status: 401, msg: "Unauthorized"})
        })
}
module.exports = insertCommentForArticle

