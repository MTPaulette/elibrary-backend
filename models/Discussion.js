module.exports = (sequelize,Sequelize) => {
    const Discussion = sequelize.define('Discussion', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    },
    {
        timestamps: true,
    });
    return Discussion;
};

