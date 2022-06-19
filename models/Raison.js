module.exports = (sequelize,Sequelize) => {
    const Raison = sequelize.define('Raison', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
    },
    {
        timestamps: true,
    });
    return Raison;
};

