const db = require('../db/connection.js')

function fetchAllArticles(queryobject) {
    let sql = "SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles"

    const keys = Object.keys(queryobject)
    const params = [];

    if(keys.includes("topic")) {
        sql += " WHERE topic = $1"
        params.push(queryobject.topic);

    } 

    if(keys.includes("sort_by")) {
        sql += ` ORDER BY ${queryobject.sort_by}`
    } else {
        sql += " ORDER BY created_at"
    }

    if(keys.includes("order")) {
        sql += ` ${queryobject.order}`
    } else {
        sql += " DESC"
    }
   
    return db.query(sql, params).then(({ rows }) => {
        if (rows.length !== 0) {
            return rows;
        } else {
            return Promise.reject({ status: 404, msg: "Not Found" });
        }
    }).catch(() => {
        return Promise.reject({ status: 404, msg: "Not Found" });
    })
}
module.exports = fetchAllArticles