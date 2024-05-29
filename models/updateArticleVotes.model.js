const db = require('../db/connection.js')

function updateArticleVotes(new_votes, article_id) {
        return db.query(`UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;`, [new_votes, article_id]).then(({rows}) => {
                return rows[0]
        })

}
module.exports = updateArticleVotes

