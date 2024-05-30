const db = require('../db/connection.js')

function fetchAllArticles(query) {
    let sql = "SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles"

    if(query) {
        sql += " WHERE topic = $1 ORDER BY created_at DESC"

        return db.query(sql, [query]).then(({ rows }) => {

            if (rows.length !== 0) {
            return rows
            } else {
            return Promise.reject( {status: 404, msg: "Not Found"})
            }
        })
    } else {
    sql += " ORDER BY created_at DESC"
    return db.query(sql).then(({ rows }) => {
        return rows
    })
    }
  
}
module.exports = fetchAllArticles