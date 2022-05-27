module.exports = (sequelize,Sequelize) => {
    const Permission = sequelize.define('Permission', {
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
    return Permission;
};

