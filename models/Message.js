module.exports = (sequelize,Sequelize) => {
    const Message = sequelize.define('Message', {
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
    return Message;
};

