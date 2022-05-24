module.exports = (sequelize,Sequelize) => {
    const Ue = sequelize.define('Ue', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        intitule: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    },
    {
        timestamps: true,
    });
    return Ue;
};

