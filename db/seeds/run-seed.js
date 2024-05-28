const devData = require('../data/development-data/index.js');
const testData = require('../data/test-data/index.js');
const ENV = process.env.NODE_ENV || 'development';
const seed = require('./seed.js');
const db = require('../connection.js');

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
