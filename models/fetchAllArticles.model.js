const db = require('../db/connection.js');

function fetchAllArticles({ topic, sort_by = 'created_at', order = 'ASC' }) {
    const validSortColumns = ['article_id', 'title', 'topic', 'author', 'created_at', 'votes', 'article_img_url', 'comment_count'];
    const validOrderDirections = ['ASC', 'DESC'];

    // Ensure the sort_by and order parameters are valid
    if (!validSortColumns.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: 'Invalid sort_by column' });
    }
    if (!validOrderDirections.includes(order.toUpperCase())) {
        return Promise.reject({ status: 400, msg: 'Invalid order direction' });
    }

    let sql = `
        SELECT 
            articles.article_id, 
            articles.title, 
            articles.topic, 
            articles.author, 
            articles.created_at, 
            articles.votes, 
            articles.article_img_url,
            COUNT(comments.article_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON articles.article_id = comments.article_id
    `;

    const values = [];
    if (topic) {
        sql += " WHERE articles.topic = $1";
        values.push(topic);
    }

    sql += ` GROUP BY articles.article_id`;

    // Add sorting and ordering
    if (sort_by !== 'comment_count') {
        sql += ` ORDER BY articles.${sort_by} ${order.toUpperCase()}`;
    } else {
        sql += ` ORDER BY comment_count ${order.toUpperCase()}`;
    }

    return db.query(sql, values).then(({ rows }) => {
        if (rows.length !== 0) {
            return rows;
        } else {
            return Promise.reject({ status: 404, msg: "Not Found" });
        }
    });
}

module.exports = fetchAllArticles;