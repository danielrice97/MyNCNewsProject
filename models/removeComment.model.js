const db = require('../db/connection.js')

function removeComment(comment_id) {
        return db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [comment_id]).then(({rows}) => {
            return rows[0]
        }).catch(() => {
                return Promise.reject({ status : 400, msg: "Bad Request"})
        })
}
module.exports = removeComment

