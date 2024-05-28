const fs = require('fs/promises')

async function fetchAllEndPointsInfo () {
   const endpoints = await fs.readFile("./endpoints.json", "utf-8")
   const parsedEndpoints = JSON.parse(endpoints);
   if(parsedEndpoints != undefined) {
   return parsedEndpoints
   } else {
   return Promise.reject({ status: 404, msg: "Not Found"})
   }
}

module.exports = fetchAllEndPointsInfo