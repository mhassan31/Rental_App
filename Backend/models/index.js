var Sequelize = require("sequelize");
var initModels = require('./init-models').initModels;

const config = require('../db-config.json')['development'];

// config.logging = function (str) {
//     console.log(str);
// ;}  // Execute default Query

let sequelize;
const db = {};
sequelize = new Sequelize(config.database, config.username, config.password, config);

var models = initModels(sequelize);

// models['Sequelize'] = Sequelize;
// models['sequelize'] = sequelize;

module.exports = models;

// module.exports.sequelize = sequelize;