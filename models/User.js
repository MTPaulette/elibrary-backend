module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.TEXT,
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
        },
        etat: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'actif'
        }
    },
    {
        timestamps: true,
    });
    return User;
};

