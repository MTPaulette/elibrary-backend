module.exports = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e_library',
    key: 'yourSecret',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

/*
const mysql = require('mysql');

const connectionDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e_library'
});

connectionDB.connect( function(err) {
    console.log('connexion a la base de donnée reussie')
    if(err) {
        console.log('unable to connect with the database'+ err);
    }
})
module.exports = connectionDB;

*/