module.exports = (sequelize,Sequelize) => {
    const Notification = sequelize.define('Notification', {
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
    return Notification;
};

