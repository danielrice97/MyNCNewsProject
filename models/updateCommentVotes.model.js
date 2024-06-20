const db = require('../db/connection.js');

function updateCommentVotes(new_votes, comment_id) {
    return db.query(
        `UPDATE comments SET votes = $1 WHERE comment_id = $2 RETURNING *;`,
        [new_votes, comment_id]
    ).then(({ rows }) => {
        return rows[0];
    });
}

module.exports = updateCommentVotes;