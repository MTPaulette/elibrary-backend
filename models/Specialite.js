module.exports = (sequelize,Sequelize) => {
    const Specialite = sequelize.define('Specialite', {
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
    return Specialite;
};

