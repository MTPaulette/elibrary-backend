module.exports = (sequelize,Sequelize) => {
    const Domaine = sequelize.define('Domaine', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    },
    {
        timestamps: true,
    });
    return Domaine;
};

