const utils = require('../libs/utils');
const Sequelize = require('sequelize');
const config = require('../config');
const db = config.db;

let sequelize = new Sequelize(
    db.database,
    db.username,
    db.pwd,
    {
        dialect:db.name,
        host:config.db.host,
        timezone:'+08:00'
    }
);
utils.autoimport(__dirname + '/dbModels' ,function (models) {
    sequelize.import(models);
});

let models = sequelize.models;
Object.keys(models).forEach((tableName) => {
    if(models[tableName].options.hasOwnProperty('associate')){
        models[tableName].options.associate(models);
    }
});
module.exports = sequelize;
