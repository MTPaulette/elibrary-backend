module.exports = (sequelize,Sequelize) => {
    const Requete = sequelize.define('Requete', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    },
    {
        timestamps: true,
    });
    return Requete;
};

