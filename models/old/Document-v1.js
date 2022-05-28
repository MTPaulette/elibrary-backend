
const { DataTypes} = require('sequelize');
const sequelize = require('./index').sequelize;
const User = require('./User-v1');

const Document = sequelize.define('Document', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resume: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    auteur: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: true,
});
(async() => {
    await sequelize.sync({ alter: true });
})();
Document.belongsTo(User);
module.exports = Document;

//const { Sequelize,dataTypes} = require('sequelize');

/*
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
*/
