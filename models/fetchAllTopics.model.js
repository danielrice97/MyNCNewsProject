const db = require('../db/connection.js')

function fetchAllTopics() {
    return db.query("SELECT * FROM topics").then(({ rows }) => {
        return rows
    }).catch((err) => {
        return Promise.reject({ status: 500, msg: "Internal Server Error"})
    })
}

module.exports = fetchAllTopics