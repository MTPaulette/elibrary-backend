module.exports = (sequelize,Sequelize) => {
    const Filiere = sequelize.define('Filiere', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
    },
    {
        timestamps: true,
    });
    return Filiere;
};

