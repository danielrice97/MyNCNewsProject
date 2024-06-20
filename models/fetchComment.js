const db = require('../db/connection.js');

function fetchComment(comment_id) {
    return db.query("SELECT * FROM comments WHERE comment_id = $1", [comment_id]).then(({ rows }) => {
        return rows;
    });
}

module.exports = fetchComment;