const db = require('../db/connection.js')

function fetchAllTopics() {
    return db.query("SELECT * FROM topics").then(({ rows }) => {
        return rows
    })
}

module.exports = fetchAllTopics