/*
    const { Sequelize,DataTypes} = require('sequelize');
    const { sequelize} = require('./index');

    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
    });
    (async() => {
        await sequelize.sync({ force: true });
    })();
    //return User;

*/
//const { Sequelize,dataTypes} = require('sequelize');
module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
    });
    return User;
};

