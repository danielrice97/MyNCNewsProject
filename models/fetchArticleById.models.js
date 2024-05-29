const db = require('../db/connection.js')

function fetchArticleById(articleID) {
    return db.query(`SELECT * FROM articles Where article_id = $1`, [articleID]).then(({ rows }) => {
            return rows[0]
    
    }).catch(() => {
           return Promise.reject({err: 400, msg: "Bad Request"})
    })
}
module.exports = fetchArticleById