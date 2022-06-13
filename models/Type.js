module.exports = (sequelize,Sequelize) => {
    const Type = sequelize.define('Type', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
        timestamps: true,
    });
    return Type;
};

