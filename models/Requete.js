module.exports = (sequelize,Sequelize) => {
    const Requete = sequelize.define('Requete', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        message: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    },
    {
        timestamps: true,
    });
    return Requete;
};

