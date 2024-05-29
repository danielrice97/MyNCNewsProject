const db = require('../db/connection.js')

function fetchAllArticles() {
    return db.query(`SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles ORDER BY created_at DESC`).then(({ rows }) => {
            return rows
    })
}
module.exports = fetchAllArticles