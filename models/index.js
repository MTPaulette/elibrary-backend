/*
const db = require("../config/connectionDB");
const Sequelize = require("sequelize");

const connectDB = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: db.dialect,
    //operatorsAliases: false,
    pool: {
        max: db.pool.max,
        min: db.pool.min,
        acquire: db.pool.acquire,
        idle: db.pool.idle,
    }
});

module.exports = connectDB;

*/

const db = require("../config/connectionDB");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: db.dialect,
    //operatorsAliases: false,
    pool: {
        max: db.pool.max,
        min: db.pool.min,
        acquire: db.pool.acquire,
        idle: db.pool.idle,
    }
});

const dbSequelize = {};
dbSequelize.sequelize = sequelize;
dbSequelize.key = db.key;
dbSequelize.User = require('./User')(sequelize,Sequelize);
//dbSequelize.documents = require('./Document')(sequelize,Sequelize);


module.exports = dbSequelize;

 