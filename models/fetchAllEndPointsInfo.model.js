const fs = require('fs/promises')

async function fetchAllEndPointsInfo () {
   const endpoints = await fs.readFile("./endpoints.json", "utf-8")
   const parsedEndpoints = JSON.parse(endpoints);
   return parsedEndpoints
}

module.exports = fetchAllEndPointsInfo