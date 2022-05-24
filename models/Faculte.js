module.exports = (sequelize,Sequelize) => {
    const Faculte = sequelize.define('Faculte', {
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
    return Faculte;
};

