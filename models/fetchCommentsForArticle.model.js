const db = require('../db/connection.js')

function fetchCommentsForArticle(articleID) {
    return db.query(`SELECT * FROM comments Where article_id = $1 ORDER BY created_at DESC`, [articleID]).then(({ rows }) => {
            return rows
    }).catch(() => {
        return Promise.reject({err: 400, msg: "Bad Request"})
    })
}
module.exports = fetchCommentsForArticle