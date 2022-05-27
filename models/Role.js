module.exports = (sequelize,Sequelize) => {
    const Role = sequelize.define('Role', {
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
    return Role;
};

