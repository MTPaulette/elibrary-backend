module.exports = (sequelize,Sequelize) => {
    const Signalement = sequelize.define('Signalement', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
    },
    {
        timestamps: true,
    });
    return Signalement;
};

