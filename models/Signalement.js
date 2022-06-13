module.exports = (sequelize,Sequelize) => {
    const Signalement = sequelize.define('Signalement', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        contenu: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    },
    {
        timestamps: true,
    });
    return Signalement;
};

