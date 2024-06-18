const db = require('../db/connection.js');

function fetchAllArticles({ topic, sort_by = 'created_at', order = 'DESC' } = {}) {
    let validSortColumns = ['article_id', 'title', 'topic', 'author', 'created_at', 'votes', 'article_img_url'];
    let validOrderDirections = ['ASC', 'DESC'];

    // Ensure the sort_by and order parameters are valid
    if (!validSortColumns.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: 'Invalid sort_by column' });
    }
    if (!validOrderDirections.includes(order.toUpperCase())) {
        return Promise.reject({ status: 400, msg: 'Invalid order direction' });
    }

    let sql = "SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles";

    if (topic) {
        sql += " WHERE topic = $1";
    }

    sql += ` ORDER BY ${sort_by} ${order.toUpperCase()}`;

    if (topic) {
        return db.query(sql, [topic]).then(({ rows }) => {
            if (rows.length !== 0) {
                return rows;
            } else {
                return Promise.reject({ status: 404, msg: "Not Found" });
            }
        });
    } else {
        return db.query(sql).then(({ rows }) => {
            return rows;
        });
    }
}

module.exports = fetchAllArticles;